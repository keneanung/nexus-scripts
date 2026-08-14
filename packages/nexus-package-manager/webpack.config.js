const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version-next');

module.exports = {
  entry: './webpack/webpack.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              assumptions: {
                privateFieldsAsProperties: true,
                setPublicClassFields: true,
              },
              presets: [
                '@babel/preset-env',
              ],
              plugins: [
                [
                  'babel-plugin-polyfill-corejs3',
                  { method: 'usage-global', version: require('core-js/package.json').version },
                ],
                '@babel/plugin-transform-modules-commonjs',
                '@emotion',
                'react-native-web',
                '@babel/plugin-transform-private-property-in-object',
                '@babel/plugin-transform-private-methods',
              ],
            },
          },
          'ts-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'nxs'),
    library: {
      type: 'global',
      name: 'PackageManager',
      export: 'default',
    },
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    }),
    new WebpackAutoInject({
      components: {
        AutoIncreaseVersion: false,
        InjectAsComment: false,
      },
    }),
  ],
  externals: {
    'react': 'React', // Case matters here
    'react-dom' : 'ReactDOM', // Case matters here
   },
};
