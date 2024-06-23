/** @typedef {import('prettier').Config} PrettierConfig */

/** @type { PrettierConfig } */
const config = {
	plugins: ['prettier-plugin-tailwindcss'],
	printWidth: 100,
	tabWidth: 2,
	useTabs: false,
	semi: false,
	singleQuote: true,
	quoteProps: 'as-needed',
	jsxSingleQuote: false,
	trailingComma: 'none',
	bracketSpacing: true,
	arrowParens: 'avoid',
	endOfLine: 'auto',
	bracketSameLine: false,
	rangeEnd: 120,
};

export default config;
