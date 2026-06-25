import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "CBA Glass | Premium Mobile Auto Glass Replacement — Buckeye & Phoenix AZ",
  description:
    "OEM-quality mobile windshield replacement across Phoenix, Buckeye & the Valley. 30+ years experience, insurance-approved, lifetime warranty. Specializing in luxury, RV, & heavy machinery glass.",
  keywords: [
    "windshield replacement",
    "auto glass repair",
    "mobile windshield replacement",
    "Buckeye AZ",
    "Phoenix AZ",
    "RV glass replacement",
    "heavy machinery glass",
    "ADAS calibration",
    "luxury auto glass",
    "CBA Glass",
  ],
  openGraph: {
    title: "CBA Glass | Premium Mobile Auto Glass Replacement",
    description:
      "OEM-quality mobile windshield replacement across Phoenix & the Valley. 30+ years experience, insurance-approved, lifetime warranty.",
    type: "website",
    locale: "en_US",
    url: "https://cbaglass.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable}`}
      style={{
        fontFamily: "var(--font-body)",
      }}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
