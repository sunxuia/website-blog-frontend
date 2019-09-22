const variables = {
    /**
     * public path
     */
    PUBLIC_PATH: '/',
    /**
     * restful api request path, do not ends with '/'
     */
    API_PATH_PREFIX: '/api/blog',
    /**
     * gateway api, do not ends with '/'
     */
    GATEWAY_PATH_PREFIX: '/api',
    /**
     * user logout url
     */
    LOGOUT_URL: 'https://example.com/info',
    FILE_PATH_PREFIX: '/api/file'
}

for (const key of Object.keys(variables)) {
    const commandValue = process.env[key]
    if (commandValue !== undefined) {
        variables[key] = commandValue
    }
}
module.exports = variables
