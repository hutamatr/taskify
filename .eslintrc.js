module.exports = {
  env: {
    es2021: true,
    node: true,
    'react-native/react-native': true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'standard-with-typescript/hooks',
    'prettier',
    'prettier/react',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-native'],
  rules: {
    // prevent eslint to complain about the "styles" variable being used before it was defined
    'no-use-before-define': ['error', { variables: false }],
    // ignore errors for the react-navigation package
    'react/prop-types': ['error', { ignore: ['navigation', 'navigation.navigate'] }],
  },
};
