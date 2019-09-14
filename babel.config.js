module.exports = {
    presets: [
        ['@babel/preset-env', {
            // needed for webpack optimization
            modules: 'commonjs',
            useBuiltIns: 'usage',
            corejs: 2,
            debug: process.env.NODE_ENV === 'development'
        }]
    ],
    plugins: [
        'transform-vue-jsx',
        '@babel/transform-runtime',
        '@babel/plugin-syntax-dynamic-import'
    ],
    env: {
        test: {
            presets: [
                ['@babel/preset-env', {
                    modules: 'commonjs'
                }]
            ],
            plugins: ['dynamic-import-node']
        }
    }
}
