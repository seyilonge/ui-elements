'use strict';

const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function plugins() {
  var all = [];

  var production = [
    //new ExtractTextPlugin('[name].css'),
    new ExtractTextPlugin({
        filename:  'css/' + pkg.name + '.css',
        allChunks: true
    }),
    new webpack.NamedModulesPlugin(),
    //new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } })
  ];

  //return process.env.NODE_ENV === 'production' ? all.concat(production) : all;
  return all.concat(production);
}

/*
const ENTRY_POINTS = {
    button: path.join(__dirname, 'src/components/Button/index.js'),
    footer: path.join(__dirname, 'src/components/Footer/Footer.js')
}
*/

module.exports = {
  cache: true,
  entry: path.join(__dirname, 'src/index.js'),
  //entry: ENTRY_POINTS,

  output: {
    //filename:  pkg.name + '.js',
    filename:  'index.js',
    path:       path.join(__dirname, 'dist/', pkg.version),
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader?cacheDirectory=true',
            }
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        },
        {
            test: /\.woff2?$/,
            // Inline small woff files and output them below font/.
            // Set mimetype just in case.
            loader: 'url-loader',
            options: {
                name: 'assets/fonts/[hash].[ext]',
                limit: 50000,
                mimetype: 'application/font-woff',
            },
        },
        {
            test: /\.(ttf|eot)$/,
            loader: 'file-loader',
            options: {
                name: 'assets/fonts/[hash].[ext]',
            },
        },
        {
            test: /\.(png|svg)$/,
            loader: 'file-loader',
            options: {
                name: 'assets/images/[hash].[ext]',
            },
        }
    ]
  },

  plugins: plugins()
};
