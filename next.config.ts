import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/empadronamiento-difuntos",
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
};

export default nextConfig;
