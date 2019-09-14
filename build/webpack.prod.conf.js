'use strict'
const { resolvePath, ...utils } = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf')
const webpack = require('webpack')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')

const useSourceMap = true

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        path: resolvePath('/dist'),
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    optimization: {
        // runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    minChunks: 2,
                    chunks: 'initial'
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    devtool: useSourceMap ? 'source-map' : 'none',
    module: {
        rules: [
            {
                test: /\.(js|jsx|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolvePath('src')],
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    emitError: true,
                    failOnError: true
                }
            },
            // style loaders
            ...utils.styleLoaders({
                sourceMap: useSourceMap,
                lastLoader: MiniCssExtractPlugin.loader
            })
        ]
    },
    plugins: [
        // global variable
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new StylelintWebpackPlugin({
            files: ['**/*.{vue,htm,html,css,scss,sass}'],
            emitErrors: true,
            failOnError: true
        }),
        // clean dist
        new CleanWebpackPlugin(),
        // create index.html
        new HtmlWebpackPlugin({
            template: resolvePath('/index.html'),
            favicon: resolvePath('logo.png'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                chunksSortMode: 'dependency'
            }
        }),
        // extract css to a single file (chunk name)
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css'
        }),
        // optimize and compress css
        new OptimizeCssAssetsPlugin({
            preset: ['default', { discardComments: { removeAll: true } }]
        }),
        // notify on errors
        new FriendlyErrorsPlugin({
            onErrors: utils.notifyOnError
        })
    ]
})
