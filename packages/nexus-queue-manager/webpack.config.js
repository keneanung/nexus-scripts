const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version-next');
const nexusExternals = require('../../webpack.nexus-externals');

module.exports = {
  entry: {
    queueManager: './webpack/webpack.tsx'
  },
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
    filename: 'queueManager.js',
    path: path.resolve(__dirname, 'nxs'),
    library: {
      type: 'global',
      name: "QueueManager",
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
  externals: nexusExternals,
};
