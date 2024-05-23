const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const pkg = require('./package.json');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');

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
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
  
    port: 3000,
  },
  output: {
    publicPath: '/',
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
    // new ModuleFederationPlugin({
    //   name: 'host',
    //   remotes: {
    //     remote1: 'remote1@http://localhost:3001/mf-manifest.json',
    //     remote2: 'remote2@http://localhost:3002/mf-manifest.json',
    //     remote3: 'remote3@http://localhost:3003/mf-manifest.json',
    //   },
    //   shared: {
    //     ...(pkg.isShared? {moment:{}} : {}),
    //     react: {
    //       singleton: true,
    //       requiredVersion: pkg.dependencies['react'],
    //     },
    //     "react-dom": {
    //       singleton: true,
    //       requiredVersion: pkg.dependencies['react-dom'],
    //     }
    //   },
    //   runtimePlugins: ['./runtimePlugin.js']
    // }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = webpackConfig;
