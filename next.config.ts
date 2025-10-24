import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://wp.dariasikora.com/**"),
      new URL("https://bunny-wp-pullzone-g5vrskbpzz.b-cdn.net/**"),
      new URL("https://cdn.dariasikora.com/**"),
    ],
  },
};

export default nextConfig;
