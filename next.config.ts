import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/vehicles/foreign",
        destination: "/vehicles/luxury",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
