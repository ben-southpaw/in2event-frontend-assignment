/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Set a custom port for development
  env: {
    PORT: '3333',
  },
}

module.exports = nextConfig
