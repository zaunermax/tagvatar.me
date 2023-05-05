/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		// swcPlugins: [
		// 	['@swc-jotai/react-refresh', {}],
		// 	// this one causes errors 🤔
		// 	// ['@swc-jotai/debug-label', {}],
		// ],
	},
	images: {
		domains: ['oaidalleapiprodscus.blob.core.windows.net'],
	},
};

module.exports = nextConfig;
