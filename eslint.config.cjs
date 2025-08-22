const eslint = require('@eslint/js');
const prettierConfig = require('eslint-config-prettier');
const globals = require('globals');

module.exports = [
  {
    ignores: ['node_modules/'],
  },
  eslint.configs.recommended,
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },
  prettierConfig,
];
