'use strict'
const { resolvePath, ...utils } = require('./utils')
const variables = require('./variables')
const baseWebpackConfig = require('./webpack.base.conf')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')

const config = merge(baseWebpackConfig, {
    entry: {
        app: resolvePath('/mocks/main-dev.js')
    },
    mode: 'development',
    devtool: 'eval-source-map',
    // webpack-dev-server
    devServer: {
        publicPath: utils.attachEnd(variables.PUBLIC_PATH, '/'),
        port: process.env.PORT,
        host: 'localhost',
        clientLogLevel: 'warning',
        historyApiFallback: {
            index: utils.attachEnd(variables.PUBLIC_PATH, '/')
        },
        hot: true,
        inline: true,
        proxy: {
            '/api/*': {
                target: 'http://localhost:8400',
                changeOrigin: true,
                secure: false,
                pathRewrite: { '^/api': '' }
            }
        }
    },
    module: {
        rules: [
            // eslint
            {
                test: /\.(js|jsx|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolvePath('src')],
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    fix: true,
                    emitWarning: true,
                    failOnError: false
                }
            },
            // style loaders
            ...utils.styleLoaders({})
        ]
    },
    plugins: [
        // global variable
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                MOCK_FETCH: JSON.stringify(process.env.MOCK_FETCH === 'true')
            }
        }),
        new StylelintWebpackPlugin({
            files: ['**/*.{vue,htm,html,css,scss,sass}'],
            emitErrors: false,
            failOnError: false
        }),
        // create index.html
        new HtmlWebpackPlugin({
            template: resolvePath('/index.html'),
            favicon: resolvePath('logo.png'),
            publicPath: utils.attachEnd(variables.PUBLIC_PATH, '/')
        }),
        // hot replacement for webpack-dev-server
        new webpack.HotModuleReplacementPlugin()
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.getPort({
        port: process.env.PORT || 8080
    }, (err, port) => {
        if (err) {
            reject(err)
        } else {
            process.env.PORT = port
            config.devServer.port = port
            config.plugins.push(
                // notify on errors
                new FriendlyErrorsPlugin({
                    compilationSuccessInfo: {
                        messages: [
                            `Your application is running here: http://${config.devServer.host}:${config.devServer.port}`
                        ]
                    },
                    onErrors: utils.notifyOnError
                }))
            resolve(config)
        }
    })
})
