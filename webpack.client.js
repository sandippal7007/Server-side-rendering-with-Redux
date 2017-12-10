const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {

  // Tell webpack the root/entry file for our client application.

  entry: './src/client/client.js',

  // Output tells webpack where to put the output file that is generated

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'), // this folder will be created automatically by webpack
  }

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
