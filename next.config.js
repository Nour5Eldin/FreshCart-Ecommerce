/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "img.clerk.com" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // يخلي Vercel يتجاهل أخطاء TypeScript
  },
  eslint: {
    ignoreDuringBuilds: true, // يخلي Vercel يتجاهل أخطاء ESLint
  },
};

module.exports = nextConfig;

