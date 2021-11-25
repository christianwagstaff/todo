const express = require('express');
const webpack = require('webpack');
const webpackDevMiddlware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

//Tell express to use the webpack-dev-middleware and use the 
//config file as a base
app.use(
    webpackDevMiddlware(compiler, {
        publicPath: config.output.publicPath
    })
);

//Serve the files on port 3000
app.listen(3000, function() {
    console.log('App Listening on Port 3000!')
})