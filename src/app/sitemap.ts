import type { MetadataRoute } from "next";

const baseUrl = "https://cbaglass.com";
const vehicleSlugs = [
  "domestic",
  "rv",
  "classics",
  "tesla",
  "heavy-machinery",
  "luxury",
  "adas",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...vehicleSlugs.map((slug) => ({
      url: `${baseUrl}/vehicles/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
