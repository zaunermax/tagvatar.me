/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		swcPlugins: [
			['@swc-jotai/react-refresh', {}],
			// this one causes errors 🤔
			// ['@swc-jotai/debug-label', {}],
		],
		serverActions: true,
	},
	images: {
		domains: ['oaidalleapiprodscus.blob.core.windows.net'],
	},
	redirects: async () => {
		return [
			{
				source: '/',
				destination: '/dalle',
				permanent: false,
			},
		];
	},
};

module.exports = nextConfig;
