// next.config.ts

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Use SWC for faster builds and minification
  images: {
    domains: [], // Add allowed domains for external images here
  },
  // Optionally, enable experimental features
  // experimental: {
  //   appDir: true,
  // },
}

export default nextConfig
