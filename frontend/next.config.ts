import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fruitify-backend.onrender.com',
        // port: '10000',
      },
    ],
  },
  
};

export default nextConfig;
