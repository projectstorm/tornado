const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const production = process.env.NODE_ENV === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: path.join(__dirname, 'dist/main.js'),
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'dist-web')
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html')
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin()]
  },
  devtool: production ? 'source-map' : 'cheap-module-source-map',
  mode: production ? 'production' : 'development'
};
