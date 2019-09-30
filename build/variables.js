const variables = {
    /**
     * public path
     */
    PUBLIC_PATH: '/page/blog',
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
    LOGOUT_URL: 'https://localhost:8200/info',
    /**
     * file service url
     */
    FILE_PATH_PREFIX: '/api/file',
    /**
     * user service url
     */
    USER_PATH_PREFIX: '/api/user'
}

for (const key of Object.keys(variables)) {
    const commandValue = process.env[key]
    if (commandValue !== undefined) {
        variables[key] = commandValue
    }
}
module.exports = variables
