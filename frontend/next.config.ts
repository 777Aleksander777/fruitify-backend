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
    config.resolve.alias["@nextui-org/react"] = path.resolve(
      __dirname,
      "node_modules/@nextui-org/react/dist/index"
    );
    config.resolve.alias["@nextui-org/theme"] = path.resolve(
      __dirname,
      "node_modules/@nextui-org/theme"
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
