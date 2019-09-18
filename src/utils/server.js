const API_PATH_PREFIX = process.env.VARIABLES.API_PATH_PREFIX
const GATEWAY_PATH_PREFIX = process.env.VARIABLES.GATEWAY_PATH_PREFIX

export function getData (url, arg = {}) {
    return fetchData(url, arg)
}

function fetchData (url, arg) {
    const realUrl = unwrapUrl(url)
    return wrapFetchResult(fetch(
        realUrl,
        Object.assign(arg, {
            credentials: 'same-origin'
        })
    ), realUrl)
}

export function unwrapUrl (urlObj) {
    if (typeof urlObj === 'string') {
        return API_PATH_PREFIX + (urlObj.startsWith('/') ? urlObj : ('/' + urlObj))
    }
    let res = urlObj.path.startsWith('/') ? urlObj.path : ('/' + urlObj.path)
    let queryStr = ''
    if (urlObj.queries && urlObj.queries.length > 0) {
        for (const query of urlObj.queries) {
            if (!query.disable) {
                let value = query.value
                if (value === undefined || value === null) {
                    value = ''
                }
                queryStr += query.name + '=' + encodeURIComponent(value) + '&'
            }
        }
    }
    if (queryStr.length) {
        res += '?' + queryStr.substring(0, queryStr.length - 1)
    }
    if (urlObj.absolute) {
        return res
    }
    if (urlObj.gateway) {
        return GATEWAY_PATH_PREFIX + res
    }
    return API_PATH_PREFIX + res
}

function wrapFetchResult (promise, url) {
    return promise.then(res =>
        res.ok
            ? res
            : getResponse(res).then(err => {
                if (err.timestamp) {
                    err.timestamp = new Date(err.timestamp)
                }
                throw new ResponseError(url, res.status, wrapStatusText(res.status, res.statusText), err.message)
            })
    ).catch(err => {
        console.error('fetch error!', err)
        if (err instanceof TypeError) {
            const message = err.message && err.message.startsWith('net::') ? '网络错误' : err.message
            throw new ResponseError(url, null, err.message, message)
        }
        throw err
    })
}

export function getResponse (response) {
    const type = response.headers.get('Content-Type')
    if (!type || type.indexOf('plaintext') > -1) {
        return response.text()
    }
    if (type.indexOf('json') > -1) {
        return response.json()
    }
    throw new ResponseError(response.url, '-', 'unkonwn response type')
}

class ResponseError {
    constructor (url, status, statusText, message) {
        this.url = url
        this.status = status
        this.statusText = statusText
        this.message = message
    }
}

function wrapStatusText (status, statusText) {
    if (status >= 400 && status < 500) {
        return '错误的请求'
    }
    if (status >= 500 && status < 600) {
        return '服务器错误'
    }
    return statusText
}

export function getJson (url, arg = {}) {
    return getData(url, arg).then(res => res.json().catch(e => { }))
}

export function getText (url, arg = {}) {
    return getData(url, arg).then(res => res.text())
}

export function postData (url, arg = {}) {
    return fetchData(
        url,
        Object.assign(arg, {
            method: 'POST'
        })
    )
}

export function postJson (url, jsonData, arg = {}) {
    return postData(
        url,
        Object.assign(arg, {
            body: JSON.stringify(jsonData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    )
}

export function putData (url, arg = {}) {
    return fetchData(
        url,
        Object.assign(arg, {
            method: 'PUT'
        })
    )
}

export function putJson (url, jsonData, arg = {}) {
    return putData(
        url,
        Object.assign(arg, {
            body: JSON.stringify(jsonData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    )
}

export function deleteData (url, arg = {}) {
    return fetchData(
        url,
        Object.assign(arg, {
            method: 'DELETE'
        })
    )
}
