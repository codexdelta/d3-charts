// main app file which would be loading the webpack config and make the build of js file when ever there is any change in the src folder.

const express = require('express');
const path = require('path');
const webpack = require('webpack');

let app = express();

// parse the webpack config and make sure that the webpack is running
// if (process.env.NODE_ENV == 'development'){
//   const webpackHotMiddleware = require('webpack-hot-middleware');
//   const webpackDevMiddleware = require('webpack-dev-middleware');
//   const webpackConfig = require('../webpack.config.dev');
//   const compiler = webpack(webpackConfig);
//
//   app.use(webpackDevMiddleware(compiler, {
//     publicPath: webpackConfig.output.publicPath,
//     noInfo: true
//   }));
//
//   // app.use(webpackHotMiddleware(compiler));
// }

// app.get('/', (req, res)=>{
//   res.render('index');
// })
//
// app.use('/static', express.static(path.join(__dirname, 'static')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


module.exports = app
