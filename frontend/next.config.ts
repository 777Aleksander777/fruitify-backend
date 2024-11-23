import type { NextConfig } from "next";
const path = require("path");

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export',
  // webpack: (config) => {
  //   config.resolve.alias["@"] = path.join(__dirname, "src");
  //   return config;
  // },
  webpack: (config) => {
    config.resolve.alias['tailwindcss/plugin.js'] = path.resolve(
      'node_modules/tailwindcss/plugin.js'
    );
    return config;
  },
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
