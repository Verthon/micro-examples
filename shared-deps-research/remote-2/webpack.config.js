const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');

/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
  entry: './src/index',
  mode: 'production',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3003,
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: 'remote2',
      filename: 'remoteEntry2.js',
      exposes: {
        './DateRemote2': './src/components/DateRemote2',
      },
      shared: {
        ...(pkg.isShared? {moment:{}} : {}),
        react: {
          singleton: true,
          requiredVersion: pkg.dependencies['react'],
        },
        "react-dom": {
          singleton: true,
          requiredVersion: pkg.dependencies['react-dom'],
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = webpackConfig;
