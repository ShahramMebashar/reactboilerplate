var webpack = require('webpack');
var path = require('path');
var htmlWebPlugin = require('html-webpack-plugin');
var miniCssExtract = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");


var htmlWebpack = new htmlWebPlugin({
    template: path.resolve(__dirname, 'public', 'index.html'),
    filename: 'index.html'
});

var miniCss = new miniCssExtract({
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css'
})
module.exports = {
    entry: path.join(__dirname, 'src'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }, {
                test: /\.svg$/,
                use: 'svg-inline-loader'
            }, {
                test: /\.scss$/,
                //include: path.join(__dirname, 'public', 'assets') ,
                use: ['style-loader', miniCssExtract.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        htmlWebpack, miniCss
    ],
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true, parallel: true, sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
}

