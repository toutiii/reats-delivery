module.exports = [
   {
      files: ['**/*.{js,jsx,ts,tsx}'],
      languageOptions: {
         ecmaVersion: 'latest',
         sourceType: 'module',
         globals: {
            // Pour remplacer es2021: true
            Promise: 'readonly',
            Map: 'readonly',
            Set: 'readonly',
            // Pour remplacer node: true
            process: 'readonly',
            module: 'writable',
            require: 'readonly',
            __dirname: 'readonly',
            __filename: 'readonly',
            console: 'readonly',
         },
         parserOptions: {
            ecmaFeatures: {
               jsx: true,
            },
         },
      },
      settings: {
         react: {
            version: 'detect',
         },
      },
      linterOptions: {
         reportUnusedDisableDirectives: true,
      },
      // En ESLint v9, les plugins doivent être importés directement
      plugins: {
         react: 'eslint-plugin-react',
         'react-hooks': 'eslint-plugin-react-hooks',
      },
      rules: {
         indent: ['error', 4],
         'linebreak-style': ['error', 'unix'],
         quotes: ['error', 'double'],
         semi: ['error', 'always'],
         'react/prop-types': 0,
         'no-trailing-spaces': 1,
         'no-multi-spaces': 1,
         'no-unexpected-multiline': 0,
         'no-multiple-empty-lines': [2, { max: 2, maxEOF: 0 }],
         'no-whitespace-before-property': 1,
         'no-mixed-spaces-and-tabs': 1,
         'space-in-parens': 1,
         'no-extra-semi': 1,
         'no-tabs': 1,
         'no-confusing-arrow': 1,
         'multiline-ternary': 1,
         'max-len': ['error', { code: 119 }],
         'keyword-spacing': 1,
         'new-parens': 1,
         'lines-between-class-members': 1,
         'array-bracket-newline': ['error', 'always'],
         'array-bracket-spacing': 1,
         'array-element-newline': 1,
         'react-hooks/exhaustive-deps': 0,
      },
   },
   {
      ignores: ['node_modules/**', 'build/**', 'dist/**', 'coverage/**'],
   },
];
