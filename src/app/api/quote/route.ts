import { NextResponse } from "next/server";

const HIGHLEVEL_API_BASE = "https://services.leadconnectorhq.com";
const HIGHLEVEL_LOCATION_ID =
  process.env.HIGHLEVEL_LOCATION_ID ?? "vEEtbNBarON6jjBavUYI";

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

export async function POST(request: Request) {
  const token = process.env.HIGHLEVEL_PRIVATE_INTEGRATION_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "HighLevel integration is not configured." },
      { status: 503 }
    );
  }

  let payload: QuotePayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const requiredFields: Array<keyof QuotePayload> = [
    "year",
    "make",
    "model",
    "billingType",
    "name",
    "phone",
    "email",
  ];

  const missing = requiredFields.filter((field) => !isNonEmpty(payload[field]));
  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Missing required fields.", missing },
      { status: 400 }
    );
  }

  const { firstName, lastName } = splitName(payload.name ?? "");
  const paymentLabel =
    payload.billingType === "insurance" ? "Insurance" : "Cash / Self-Pay";
  const queryDetails = [
    payload.insuranceProvider
      ? `Insurance Provider: ${payload.insuranceProvider}`
      : null,
    payload.message ? `Message: ${payload.message}` : null,
    `Vehicle: ${payload.year} ${payload.make} ${payload.model}`,
    `Source: CBA Website Quote Wizard`,
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
    source: "CBA Website Quote Wizard",
    customFields: [
      { id: CUSTOM_FIELD_IDS.year, field_value: payload.year },
      { id: CUSTOM_FIELD_IDS.make, field_value: payload.make },
      { id: CUSTOM_FIELD_IDS.model, field_value: payload.model },
      { id: CUSTOM_FIELD_IDS.paymentType, field_value: paymentLabel },
      { id: CUSTOM_FIELD_IDS.query, field_value: queryDetails },
    ],
  };

  const ghlResponse = await fetch(`${HIGHLEVEL_API_BASE}/contacts/upsert`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(ghlBody),
  });

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
      response: responseJson ?? responseText,
    });

    return NextResponse.json(
      { error: "Unable to submit quote request right now." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
