import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { join } from 'path';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			gridTemplateColumns: {
				'min-content-2': 'auto 1fr'
			},
			fontSize: {
				sm: '1rem',
				base: '1.25rem'
			}
		}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				preset: [{ name: 'crimson', enhancements: true }]
			}
		}),
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.divide-fix': {
					'> :nth-child(3n+1)': {
						borderLeftWidth: '0px'
					}
				}
			});
		})
	]
} satisfies Config;

export default config;
