const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version-next');

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
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: 3,
                  },
                ],
                ['module:metro-react-native-babel-preset'],
              ],
              plugins: [
                '@babel/plugin-transform-modules-commonjs',
                ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
                ['@babel/plugin-proposal-private-methods', { loose: true }],
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
      name: "queueManager",
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
   devtool: 'source-map'
};
