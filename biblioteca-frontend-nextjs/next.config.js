/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
    // remotePatterns: [
    //   {
    //     protocol: 'https:',
    //     hostname: '**localhost:3000',
    //   },
    // ],
  },
};

module.exports = nextConfig;
