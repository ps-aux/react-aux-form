const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const app = require('./package.json')

const config = {
    entry: path.resolve(__dirname, 'dev/index.js'),
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dev/build'),
        filename: 'index.js',
    },
    resolve: {
        modules: [
            path.resolve(__dirname, '.'),
            path.resolve(__dirname, 'node_modules')]
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/
            }
            /*            {
                            test: /(\.jsx|\.js)$/,
                            loader: 'eslint-loader',
                            exclude: /node_modules/
                        }   */
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            title: app.name,
            template: path.resolve(__dirname, 'dev/index.html')
        })],

    devServer: {
        hot: false,
        port: 9100,
        noInfo: true,
        overlay: {
            warnings: true,
            errors: true
        },
        historyApiFallback: true // So browserHistory works
    },
}

module.exports = config
