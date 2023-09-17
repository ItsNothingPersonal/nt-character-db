import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			colors: {
				primary: colors.amber,
				light: colors.slate,
				dark: colors.black
			},
			gridTemplateColumns: {
				'min-content-3': 'min-content min-content min-content;',
				'min-content-2': 'auto 1fr'
			},
			gridTemplateRows: {
				'double-center': 'auto 2fr 1fr',
				'title-content': 'auto 1fr'
			},
			screens: {
				xss: '375px',
				xs: '475px'
			}
		}
	},

	plugins: [require('flowbite/plugin')]
};
