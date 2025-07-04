import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
        pathname: '/**',
      }
    ]
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  
  /* config options here */
};

export default nextConfig;
