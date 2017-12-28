const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/viva.js',
  output: {
    publicPath: 'server/static',
    path: path.resolve(__dirname, 'server/static'),
    filename: 'adChart.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.css$/,
      include: /node_modules/,
      loaders: ['style-loader', 'css-loader']
    }, {
      test: /\.ejs$/,
      loader: ['ejs-loader?variable=data']
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react']
        }
      }]
    }]
  },
  plugins: [
    // new webpack.HotmoduleReplacementPlugin(),
    // new HtmlwebpackPlugin({
    //   title: 'React Starter Kit',
    //   hash: true,
    //   inject: false,
    //   appMountId: 'root',
    //   template: 'ejs-loader!server/views/index.ejs'
    // })
  ]
}
