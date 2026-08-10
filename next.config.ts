import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/cba-glass",
        destination: "/",
        permanent: true,
      },
      {
        source: "/windshield-repair-classics",
        destination: "/vehicles/classics",
        permanent: true,
      },
      {
        source: "/windshield-repair-foreign-vehicles",
        destination: "/vehicles/luxury",
        permanent: true,
      },
      {
        source: "/windshield-repair-domestic-vehicles",
        destination: "/vehicles/domestic",
        permanent: true,
      },
      {
        source: "/windshield-repair-tesla",
        destination: "/vehicles/tesla",
        permanent: true,
      },
      {
        source: "/calibration-services-2889",
        destination: "/vehicles/adas",
        permanent: true,
      },
      {
        source: "/windshield-repair-luxury-exotic-vehicles",
        destination: "/vehicles/luxury",
        permanent: true,
      },
      {
        source: "/rv-windshield-repair",
        destination: "/vehicles/rv",
        permanent: true,
      },
      {
        source: "/thank-you",
        destination: "/#contact",
        permanent: true,
      },
      {
        source: "/vehicles/foreign",
        destination: "/vehicles/luxury",
        permanent: true,
      },
    ];
  },
};

export default withBotId(nextConfig);
