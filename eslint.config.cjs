const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const prettierConfig = require('eslint-config-prettier');
const globals = require('globals');
const jestPlugin = require('eslint-plugin-jest');

module.exports = tseslint.config(
  {
    ignores: ['node_modules/', 'build/', '.cache/', 'coverage/'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.strictTypeChecked,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'max-depth': ['warn', 4],
      complexity: ['warn', 10],
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*.test.ts'],
    ...jestPlugin.configs['flat/recommended'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'jest/prefer-expect-assertions': 'off',
      'jest/no-identical-title': 'error',
      'jest/no-commented-out-tests': 'warn',
      'jest/no-disabled-tests': 'warn',
      'jest/require-top-level-describe': 'error',
      'jest/no-conditional-expect': 'error',
      'jest/valid-expect': 'error',
      'jest/valid-title': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-deprecated-functions': 'warn',
      'jest/prefer-to-have-length': 'warn',
      'jest/prefer-to-be': 'warn',
      'jest/prefer-strict-equal': 'warn',
      'jest/prefer-hooks-on-top': 'warn',
    },
  },
  prettierConfig,
);
