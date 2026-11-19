import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages:['react-icons'],
  async rewrites() {
    return [
      { source: "/logo-lab", destination: "/logo-lab.html" },
    ]
  },
};

export default nextConfig;
