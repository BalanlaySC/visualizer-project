import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default tseslint.config(
  {
    ignores: ['dist', 'coverage', 'node_modules'],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  // ============================================================
  // ARCHITECTURE GUARDRAILS - ENFORCED AT ERROR LEVEL
  // ============================================================
  {
    // Domain layer must be pure - no React, no browser APIs
    files: ['src/features/**/domain/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: ['react', 'react-dom', 'react-dom/client'],
          patterns: ['*.css', '**/ui/**', '**/application/**', '**/infrastructure/**'],
        },
      ],
      'no-restricted-globals': ['error', 'window', 'document', 'localStorage', 'sessionStorage'],
    },
  },
  {
    // Domain layer should only import from core types or sibling domain files
    files: ['src/features/**/domain/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: ['react', 'react-dom', 'react-dom/client'],
          patterns: [
            '*.css',
            '**/ui/**',
            '**/application/**',
            '**/infrastructure/**',
            '**/components/**',
          ],
        },
      ],
    },
  },
  {
    // Application layer should not import from UI directly
    files: ['src/features/**/application/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'warn',
        {
          patterns: ['**/ui/components/**'],
        },
      ],
    },
  },
  {
    // Infrastructure layer should only be imported by application layer
    files: ['src/features/**/infrastructure/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'warn',
        {
          patterns: ['**/ui/**'],
        },
      ],
    },
  },
  // ============================================================
  // CODE QUALITY RULES
  // ============================================================
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
)