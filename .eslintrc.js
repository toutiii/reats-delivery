module.exports = {
   env: {
      es2021: true,
      node: true,
   },
   settings: {
      react: {
         version: 'detect',
      },
   },
   extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
   ],
   overrides: [
      {
         files: ['tailwind.config.js'],
         rules: {
            'max-len': 'off',
         },
      },
      {
         files: ['.eslintrc.{js,cjs}'],
         env: {
            node: true,
         },
         parserOptions: {
            sourceType: 'script',
         },
      },
   ],
   parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
   },
   plugins: ['react', 'prettier'],
   rules: {
      'prettier/prettier': 'error',
      'react/prop-types': 0,
      'react-hooks/exhaustive-deps': 0,
      'max-len': ['error', { code: 119 }],
      'no-multiple-empty-lines': [2, { max: 2, maxEOF: 0 }],
      'no-trailing-spaces': 1,
      'no-multi-spaces': 1,
      'no-whitespace-before-property': 1,
      'no-mixed-spaces-and-tabs': 1,
   },
};
