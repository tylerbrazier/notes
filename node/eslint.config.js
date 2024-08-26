// https://eslint.org/docs/latest/use/getting-started#manual-set-up

import js from '@eslint/js';
import globals from 'globals';

export default [
	js.configs.recommended,
	{
		languageOptions: {
			globals: globals.nodeBuiltin
		},
		rules: {
		}
	}
];
