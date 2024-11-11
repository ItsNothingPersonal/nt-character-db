import eslint from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import svelteEslint from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

const testingDSL = {
	it: 'readonly',
	expect: 'readonly',
	describe: 'readonly'
};

const ignores = [
	// Sure, let's lint our lint config... :D
	// ./eslint.config.js
	'.DS_Store',
	'.env',
	'.env.*',
	'.github',
	// On CI our PNPM store is local to the application source
	'.pnpm-store/**/*',
	'.svelte-kit/**/*',
	'.vscode',
	'node_modules/**/*',
	'build/**/*',
	'package/**/*',

	// Ignore files for PNPM, NPM and YARN
	'pnpm-lock.yaml',
	'package-lock.json',
	'yarn.lock'
];

export default [
	{ ignores },
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...svelteEslint.configs['flat/prettier'],
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tseslint.parser
			},
			globals: {
				CustomEvent: 'readonly',
				console: 'readonly',
				Event: 'readonly',
				window: 'readonly',
				URL: 'readonly',
				HTMLInputElement: 'readonly',
				sessionStorage: 'readonly',
				document: 'readonly',
				fetch: 'readonly'
			}
		},
		env: {
			browser: true,
			es2021: true
		}
	},
	{
		files: ['**/*.svelte.test.ts'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tseslint.parser,
				globals: {}
			},
			globals: {
				CustomEvent: 'readonly',
				...testingDSL
			}
		}
	},
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tseslint.parser
		}
	},
	{
		files: ['**/*.test.ts'],
		languageOptions: {
			parser: tseslint.parser,
			globals: {
				...testingDSL
			}
		}
	},
	{
		files: ['**/*server.ts'],
		languageOptions: {
			parser: tseslint.parser
		}
	},
	{
		files: ['**/*server.test.ts'],
		languageOptions: {
			parser: tseslint.parser,
			globals: {
				...testingDSL
			}
		}
	},
	{
		plugins: {
			'@typescript-eslint': tseslint.plugin,
			import: pluginImport
		},
		rules: {
			semi: 'warn',
			'svelte/sort-attributes': 'warn'
		}
	},
	{
		files: [
			'src/lib/components/selectionbox/selectionbox.svelte',
			'src/lib/components/editableRatingSelection/editableRatingSelection.svelte',
			'src/lib/components/ratingSelection/ratingSelection.svelte'
		],
		rules: {
			'no-undef': 0
		}
	}
];
