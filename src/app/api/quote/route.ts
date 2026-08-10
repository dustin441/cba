import { NextResponse } from "next/server";
import { checkBotId } from "botid/server";
import {
  CONSENT_DISCLOSURE,
  CONSENT_DISCLOSURE_VERSION,
} from "@/lib/consent";

const HIGHLEVEL_API_BASE = "https://services.leadconnectorhq.com";
const HIGHLEVEL_TIMEOUT_MS = 10_000;
const MAX_REQUEST_BYTES = 20_000;
const HIGHLEVEL_LOCATION_ID =
  process.env.HIGHLEVEL_LOCATION_ID ?? "vEEtbNBarON6jjBavUYI";
const HIGHLEVEL_QUOTE_WORKFLOW_ID =
  process.env.HIGHLEVEL_QUOTE_WORKFLOW_ID ??
  "87c6c907-11ff-40d3-b2e7-dc894fad9412";

const CUSTOM_FIELD_IDS = {
  year: "1d1ukfiUsvDdgqGCRwaA",
  make: "tCstxea4FWz17o0ZATn6",
  model: "RAfBl10qKSmjfoyw63Wd",
  paymentType: "YXhOiALxHJtcCuKOtj9g",
  query: "Z4gv508HWTGxZ2YvHWl5",
} as const;

type QuotePayload = {
  year?: string;
  make?: string;
  model?: string;
  billingType?: "insurance" | "cash";
  insuranceProvider?: string;
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  source?: string;
  consent?: boolean;
};

function isNonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function splitName(name: string) {
  const parts = name.trim().split(/\s+/);
  return {
    firstName: parts[0] ?? "",
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : "",
  };
}

async function readBoundedJsonBody(request: Request): Promise<unknown> {
  if (!request.body) {
    throw new SyntaxError("Missing request body");
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let totalBytes = 0;
  let body = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    totalBytes += value.byteLength;
    if (totalBytes > MAX_REQUEST_BYTES) {
      await reader.cancel().catch(() => undefined);
      throw new RangeError("Request body too large");
    }

    body += decoder.decode(value, { stream: true });
  }

  body += decoder.decode();
  return JSON.parse(body);
}

async function enrollContactInWorkflow(contactId: string, token: string) {
  const url = `${HIGHLEVEL_API_BASE}/contacts/${contactId}/workflow/${HIGHLEVEL_QUOTE_WORKFLOW_ID}`;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: ["Bearer", token].join(" "),
          Version: "2021-07-28",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        signal: AbortSignal.timeout(HIGHLEVEL_TIMEOUT_MS),
      });

      if (response.ok) return { ok: true, status: response.status };
      if (response.status < 500 || attempt === 1) {
        return { ok: false, status: response.status };
      }
    } catch {
      if (attempt === 1) return { ok: false };
    }
  }

  return { ok: false };
}

export async function POST(request: Request) {
  const botCheck = await checkBotId();
  if (botCheck.isBot) {
    return NextResponse.json({ error: "Access denied." }, { status: 403 });
  }

  const token = process.env.HIGHLEVEL_PRIVATE_INTEGRATION_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "HighLevel integration is not configured." },
      { status: 503 }
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  let parsedPayload: unknown;
  try {
    parsedPayload = await readBoundedJsonBody(request);
  } catch (error) {
    if (error instanceof RangeError) {
      return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    }
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (
    typeof parsedPayload !== "object" ||
    parsedPayload === null ||
    Array.isArray(parsedPayload)
  ) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const candidate = parsedPayload as Record<string, unknown>;
  const stringFields: Array<Exclude<keyof QuotePayload, "consent">> = [
    "name",
    "phone",
    "email",
    "year",
    "make",
    "model",
    "billingType",
    "insuranceProvider",
    "message",
    "source",
  ];
  const invalidTypes = stringFields.filter(
    (field) => candidate[field] !== undefined && typeof candidate[field] !== "string"
  );
  if (
    invalidTypes.length > 0 ||
    (candidate.consent !== undefined && typeof candidate.consent !== "boolean")
  ) {
    return NextResponse.json(
      { error: "Invalid field types.", fields: invalidTypes },
      { status: 400 }
    );
  }

  if (
    candidate.billingType !== undefined &&
    candidate.billingType !== "insurance" &&
    candidate.billingType !== "cash"
  ) {
    return NextResponse.json(
      { error: "Invalid billing type." },
      { status: 400 }
    );
  }

  const payload = candidate as QuotePayload;

  const requiredFields: Array<keyof QuotePayload> = ["name", "phone", "email"];

  const missing = requiredFields.filter((field) => !isNonEmpty(payload[field]));
  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Missing required fields.", missing },
      { status: 400 }
    );
  }

  if (payload.consent !== true) {
    return NextResponse.json(
      { error: "Consent is required." },
      { status: 400 }
    );
  }

  const fieldLimits: Partial<Record<keyof QuotePayload, number>> = {
    name: 120,
    phone: 40,
    email: 254,
    year: 4,
    make: 100,
    model: 120,
    insuranceProvider: 100,
    message: 2_000,
    source: 80,
  };
  const oversized = Object.entries(fieldLimits)
    .filter(([field, limit]) => {
      const value = payload[field as keyof QuotePayload];
      return typeof value === "string" && value.length > limit;
    })
    .map(([field]) => field);

  if (oversized.length > 0) {
    return NextResponse.json(
      { error: "One or more fields are too long.", fields: oversized },
      { status: 400 }
    );
  }

  if (isNonEmpty(payload.year) && !/^\d{4}$/.test(payload.year.trim())) {
    return NextResponse.json(
      { error: "Vehicle year must be four digits." },
      { status: 400 }
    );
  }

  const { firstName, lastName } = splitName(payload.name ?? "");
  const source =
    payload.source === "30-second CTA popup"
      ? "CBA Website Quote Popup"
      : "CBA Website Quote Wizard";
  const paymentLabel = payload.billingType
    ? payload.billingType === "insurance"
      ? "Insurance"
      : "Cash / Self-Pay"
    : null;
  const vehicle = [payload.year, payload.make, payload.model]
    .filter(isNonEmpty)
    .join(" ");
  const consentTimestamp = new Date().toISOString();
  const queryDetails = [
    payload.insuranceProvider
      ? `Insurance Provider: ${payload.insuranceProvider}`
      : null,
    payload.message ? `Message: ${payload.message}` : null,
    vehicle ? `Vehicle: ${vehicle}` : null,
    `Source: ${source}`,
    "Communication consent: Yes",
    `Consent timestamp UTC: ${consentTimestamp}`,
    `Consent disclosure version: ${CONSENT_DISCLOSURE_VERSION}`,
    `Consent disclosure: ${CONSENT_DISCLOSURE}`,
  ]
    .filter(Boolean)
    .join("\n");

  const ghlBody = {
    locationId: HIGHLEVEL_LOCATION_ID,
    firstName,
    lastName,
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    source,
    customFields: [
      isNonEmpty(payload.year)
        ? { id: CUSTOM_FIELD_IDS.year, field_value: payload.year }
        : null,
      isNonEmpty(payload.make)
        ? { id: CUSTOM_FIELD_IDS.make, field_value: payload.make }
        : null,
      isNonEmpty(payload.model)
        ? { id: CUSTOM_FIELD_IDS.model, field_value: payload.model }
        : null,
      paymentLabel
        ? { id: CUSTOM_FIELD_IDS.paymentType, field_value: paymentLabel }
        : null,
      { id: CUSTOM_FIELD_IDS.query, field_value: queryDetails },
    ].filter(Boolean),
  };

  let ghlResponse: Response;
  try {
    ghlResponse = await fetch(`${HIGHLEVEL_API_BASE}/contacts/upsert`, {
      method: "POST",
      headers: {
        Authorization: ["Bearer", token].join(" "),
        Version: "2021-07-28",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(ghlBody),
      signal: AbortSignal.timeout(HIGHLEVEL_TIMEOUT_MS),
    });
  } catch {
    console.error("HighLevel quote submit request failed");
    return NextResponse.json(
      { error: "Unable to submit quote request right now." },
      { status: 502 }
    );
  }

  const responseText = await ghlResponse.text();
  let responseJson: unknown = null;
  try {
    responseJson = responseText ? JSON.parse(responseText) : null;
  } catch {
    responseJson = null;
  }

  if (!ghlResponse.ok) {
    console.error("HighLevel quote submit failed", {
      status: ghlResponse.status,
    });

    return NextResponse.json(
      { error: "Unable to submit quote request right now." },
      { status: 502 }
    );
  }

  const contactId =
    typeof responseJson === "object" && responseJson !== null
      ? (responseJson as { contact?: { id?: string } }).contact?.id
      : undefined;

  if (!contactId) {
    console.error("HighLevel quote submit returned no contact ID");
    return NextResponse.json(
      { error: "Unable to start quote follow-up right now." },
      { status: 502 }
    );
  }

  const workflowEnrollment = await enrollContactInWorkflow(contactId, token);
  if (!workflowEnrollment.ok) {
    console.error("HighLevel quote workflow enrollment failed", {
      status: workflowEnrollment.status,
    });
    return NextResponse.json(
      { error: "Unable to start quote follow-up right now." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
