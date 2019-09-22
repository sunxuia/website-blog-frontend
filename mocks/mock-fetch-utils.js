/* eslint-disable no-unused-vars */
import fetchMock from 'fetch-mock'
import Mock from 'mockjs'
import * as S from '@/utils/server'

const DELAY_MILLIS = 0

fetchMock.config.fallbackToNetwork = true

export function mockGetOk (url, returnValue) {
    fetchMock.get(S.unwrapUrl(url), unwrapReturnValue(returnValue))
}

function unwrapReturnValue (returnValue) {
    if (returnValue === undefined) {
        return delay()
    }
    if (typeof returnValue === 'function') {
        return (...args) => delay(returnValue(args))
    }
    return delay(returnValue)
}

function delay (res) {
    return new Promise(resolve => setTimeout(resolve, DELAY_MILLIS)).then(() => res)
}

export function mockMatchGetOk (type, url, returnValue) {
    fetchMock.get(unwrapMatchUrl(type, url), unwrapReturnValue(returnValue))
}

function unwrapMatchUrl (type, url) {
    if (type === 'regexp') {
        let prefix = S.unwrapUrl('/')
        prefix = prefix.substring(1)
        if (prefix.endsWith('/')) {
            prefix = prefix.substring(0, prefix.length - 1)
        }
        prefix = prefix.replace(/\\/g, '\\').replace(/\//g, '\\/')
        url = new RegExp(prefix + url)
        return url
    }
    return `${type}:${S.unwrapUrl(url)}`
}

export function mockPostError (url, status, message) {
    url = S.unwrapUrl(url)
    fetchMock.post(url, delay(errorResponse(url, status, message)))
}

function errorResponse (url, status, message) {
    return new Response(
        JSON.stringify({
            timestamp: '2019-01-23T12:34:56.789+0800',
            path: S.unwrapUrl(url),
            status,
            message
        }),
        {
            status
        }
    )
}

export function mockPostOk (url, returnValue) {
    fetchMock.post(S.unwrapUrl(url), unwrapReturnValue(returnValue))
}

export function mockMatchPostOk (type, url, returnValue) {
    fetchMock.post(unwrapMatchUrl(type, url), unwrapReturnValue(returnValue))
}

export function mockPutOk (url, returnValue) {
    fetchMock.put(S.unwrapUrl(url), unwrapReturnValue(returnValue))
}

export function mockMatchPutOk (type, url, returnValue) {
    fetchMock.put(unwrapMatchUrl(type, url), unwrapReturnValue(returnValue))
}

export function mockDeleteOk (url, returnValue) {
    fetchMock.delete(S.unwrapUrl(url), unwrapReturnValue(returnValue))
}

export function mockMatchDeleteOk (type, url, returnValue) {
    fetchMock.delete(unwrapMatchUrl(type, url), unwrapReturnValue(returnValue))
}

export function mockList (obj, count = 5, upperLimit) {
    const listAttrName = 'list|' + (upperLimit ? count + '-' + upperLimit : count)
    const listObj = {}
    listObj[listAttrName] = [obj]
    const list = Mock.mock(listObj)
    return list.list
}

export function mockValueList (obj, count, upperLimit) {
    const list = mockList(obj, count, upperLimit)
    if (list.length === 0) {
        return []
    }
    const name = Object.keys(list[0])[0]
    const res = []
    for (const item of list) {
        res.push(item[name])
    }
    return res
}
