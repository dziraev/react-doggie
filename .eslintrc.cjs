module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', project: './tsconfig.json' },
  plugins: ['react-refresh', 'react', '@typescript-eslint', 'prettier'],
  rules: {
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    'jsx-a11y/anchor-is-valid': 'off',
    'no-unused-vars': 'warn',
    'no-undef': 0,
    'arrow-body-style': ['error', 'as-needed'],
    'consistent-return': 0,
    'react/prop-types': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    '@typescript-eslint/no-shadow': 0,
    'react/button-has-type': 0
  }
};
