'use strict'
const { resolvePath, ...utils } = require('./utils')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const variables = require('./variables')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    context: resolvePath('/'),
    entry: {
        app: resolvePath('/src/main.js')
    },
    output: {
        publicPath: utils.attachEnd(variables.PUBLIC_PATH, '/')
    },
    resolve: {
        extensions: ['.js', '.json', '.css', '.vue'],
        alias: {
            '@': resolvePath('/src'),
            vue$: 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            // vue
            {
                test: /\.(vue)$/,
                loader: 'vue-loader',
                options: require('./vue-loader.conf')
            },
            // babel
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: resolvePath('src')
            },
            // image file loader
            utils.assetsLoader({
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                outputPath: 'img'
            }),
            // video and sound file loader
            utils.assetsLoader({
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                outputPath: 'media'
            }),
            // font file loader
            utils.assetsLoader({
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                outputPath: 'fonts'
            })
        ]
    },
    plugins: [
        // global variable
        new webpack.DefinePlugin({
            'process.env': {
                VARIABLES: JSON.stringify(variables)
            }
        }),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([{
            from: resolvePath('/static'),
            to: resolvePath('/dist/static'),
            ignore: ['.*']
        }])
    ]
}
