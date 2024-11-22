/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [],
	},
	// Update paths
	publicRuntimeConfig: {
		publicDir: 'src/public',
	},
};

export default nextConfig;
