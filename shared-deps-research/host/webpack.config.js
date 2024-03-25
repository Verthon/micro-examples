const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');


/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3001,
  },
  output: {
    publicPath: 'auto',
  },
  performance: {
    hints: false,
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
      name: 'app1',
      remotes: {
        remote1: 'remote1@http://localhost:3002/remoteEntry1.js',
        remote2: 'remote2@http://localhost:3003/remoteEntry2.js',
        remote3: 'remote3@http://localhost:3004/remoteEntry3.js',
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
