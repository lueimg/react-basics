const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './source/client.js',
    output: {
        filename: 'app.js',
        path:'./build/statics',
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json',

            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /(node_module)/,
                query: {
                    presets: ['es2016','es2017', 'react'],
                    plugins: ['transform-es2015-modules-commonjs']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('../statics/styles.css')
    ],
    target: 'web'
}