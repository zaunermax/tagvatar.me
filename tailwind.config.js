/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./node_modules/flowbite-react/**/*.js',
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			height: {
				screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
			},
			minHeight: {
				screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
			},
		},
	},
	plugins: [require('flowbite/plugin')],
};
