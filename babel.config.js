module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-paper/babel',
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          extensions: [
            '.ios.js',
            '.android.js',
            '.ios.jsx',
            '.android.jsx',
            '.js',
            '.jsx',
            '.json',
            '.ts',
            '.tsx',
          ],
          root: ['./src'],
          alias: {
            '@api': './src/api/',
            '@assets': './assets/',
            '@components': './src/components/',
            '@screens': './src/screens/',
            '@store': './src/store/',
            '@hooks': './src/hooks/',
            '@navigation': './src/navigation/',
            '@utils': './src/utils/',
            types: './src/types/',
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel', 'react-native-reanimated/plugin'],
      },
    },
  };
};
