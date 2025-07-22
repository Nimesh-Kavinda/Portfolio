/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'avatars.githubusercontent.com', 'github.com'],
    unoptimized: true
  },
  swcMinify: true,
};

module.exports = nextConfig;
