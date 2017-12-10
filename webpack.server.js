const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  //Inform webpack for building a bundle for node js, rather than for browser.
  target: 'node',

  // Tell webpack the root/entry file for our server application.

  entry: './src/index.js',

  // Output tells webpack where to put the output file that is generated

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'), // this folder will be created automatically by webpack
  },

  externals: [webpackNodeExternals()] // This tells don't include anything which is there in node_modules

  // Tell webpack to run babel on every file to transplie to ES5
  // This part is common for both client and server. So we took this common code to a webpack.base.js
  // and do webpack merging by use of webpack-merge package
  // module: {
  //   rules: [
  //     {
  //       test: /\.js?$/,
  //       loader: 'babel-loader',
  //       exclude: /node_modules/,
  //       options: {
  //         presets: [
  //           'react', // JSX -- Js
  //           'stage-0', // Some Async stuff
  //           ['env', { targets: {browsers: ['last 2 versions']}}]
  //         ]
  //       }
  //     }
  //   ]
  // }
}
module.exports = merge(baseConfig, config); // merging
