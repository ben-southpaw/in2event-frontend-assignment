/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Update paths for new structure
  publicRuntimeConfig: {
    publicDir: 'src/public',
  },
};

export default nextConfig;
