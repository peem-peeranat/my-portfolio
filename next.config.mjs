/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  // Keep the local development badge from covering the mobile bottom navigation.
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
}

export default nextConfig;
