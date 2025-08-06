/** @type {import('next').NextConfig} */
const Dotenv = require('dotenv-webpack');

const nextConfig = {
  // config options here
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // This is to allow the Next.js dev server to be accessible from the
    // preview iframe.
    
  },
  webpack: (config) => {
    config.plugins.push(new Dotenv({
      path: './.env',
      systemvars: true,
    }));
    return config;
  },
};

module.exports = nextConfig;
