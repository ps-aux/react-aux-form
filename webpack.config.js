const path = require('path')

const artifact = require('./package.json')

const config = {
    entry: path.resolve(__dirname, 'src/index.js'),
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        library: artifact.name,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        modules: [
            path.resolve(__dirname, '.'),
            path.resolve(__dirname, 'node_modules')
        ]
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/
            }
        ]
    },
    plugins: [
    ],
    externals: [
        'react',
        'react-dom',
        'prop-types'
    ],
}

module.exports = config
