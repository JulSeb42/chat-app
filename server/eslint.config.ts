import tseslint from "typescript-eslint"
import globals from "globals"
import pluginJs from "@eslint/js"

export default [
	{ files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
	{ languageOptions: { globals: globals.commonjs } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,

	{
		rules: {
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-empty-object-type": "off",
			"no-empty-pattern": "warn",
			"no-empty": "warn",
			"@typescript-eslint/ban-ts-comment": "off",
		},
	},
	{
		ignores: ["eslint.config.js", "plop/*", "vite.config.ts"],
	},
	{ files: ["src/*"] },
]
