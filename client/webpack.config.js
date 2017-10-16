const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');


module.exports = {
    entry: [
        'react-hot-loader/patch',
        './src/index.js'
    ],
    output: {
        filename: 'bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components|public\/)/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader?sourceMap',
                    'css-loader' //?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components'),
            'redux-local': path.resolve(__dirname, 'src/redux')
        }
    },
    devServer: {
        historyApiFallback: true,

        inline: true,

        hot: true,

        port: 8080
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'public/index.html' }),
        new webpack.NoEmitOnErrorsPlugin()
        // new ExtractTextPlugin("style.css")
    ],
    devtool: '#eval-source-map'
};





// -------------- PRODUCTION ---------------------

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';

    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            // sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new CompressionPlugin({
            // algorithm: "gzip",
            // test: /\.(js)$/
        })
    ])
}

