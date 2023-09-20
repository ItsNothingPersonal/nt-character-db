import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { join } from 'path';
import type { Config } from 'tailwindcss';
import { ntTheme } from './nt-theme';

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
			gridTemplateRows: {
				'double-center': 'auto 2fr 1fr',
				'title-content': 'auto 1fr'
			}
		}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				custom: [ntTheme]
			}
		})
	]
} satisfies Config;

export default config;
