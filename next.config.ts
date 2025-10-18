import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://dariasikora.com/**")],
  },
};

export default nextConfig;
