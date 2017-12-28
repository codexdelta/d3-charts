const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'server/static'),
    filename: 'adChart.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [{
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
    },
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
    }]
  },
  plugins: [
  //   new HtmlWebpackPlugin({
  //     title: 'Wolf',
  //     template: './src/root.ejs'
  //   })
  ]
}
