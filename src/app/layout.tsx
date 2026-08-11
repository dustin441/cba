import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const gtmId = "GTM-T8Q2RNZZ";

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
      <head>
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          id="google-tag-manager"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
