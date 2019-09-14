module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    extends: [
        'plugin:vue/recommended',
        'standard',
        'plugin:jest/recommended'
    ],
    plugins: [
        'babel',
        'vue',
        'jest'
    ],
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // indent to 4 space
        'indent': ['warn', 4],
        // vue html indent to 4 spaces
        "vue/html-indent": ['warn', 4]
    }
}
