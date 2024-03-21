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
    port: 3002,
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
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button',
        './Counter': './src/components/Counter',
      },
      shared: {
        react: {
          requiredVersion: pkg.dependencies['react'],
        },
        "react-dom": {
          requiredVersion: pkg.dependencies['react-dom'],
        }
      },
      // shared: [
      //   'react-dom',
      //   {
      //     // react: {
      //     //   import: 'react', // the "react" package will be used a provided and fallback module
      //     //   shareKey: 'newReact', // under this name the shared module will be placed in the share scope
      //     //   shareScope: 'default', // share scope with this name will be used
      //     //   singleton: true, // only a single version of the shared module is allowed
      //     // },
      //     // reactNew: {
      //     //   import: "react", // the "react" package will be used a provided and fallback module
      //     //   shareKey: "reactNew", // under this name the shared module will be placed in the share scope
      //     //   shareScope: "modern", // share scope with this name will be used
      //     //   singleton: true, // only a single version of the shared module is allowed
      //     // },
      //   },
      // ],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = webpackConfig;
