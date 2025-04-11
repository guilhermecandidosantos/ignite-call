import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
}

export default nextConfig
