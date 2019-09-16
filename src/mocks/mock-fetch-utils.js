/* eslint-disable no-unused-vars */
import fetchMock from 'fetch-mock'
import Mock from 'mockjs'
import * as S from '@/utils/server'

const DELAY_MILLIS = 0

fetchMock.config.fallbackToNetwork = true

export function mockGetOk (url, returnValue) {
    fetchMock.get(S.unwrapUrl(url), delay(returnValue))
}

function delay (res) {
    return new Promise(resolve => setTimeout(resolve, DELAY_MILLIS)).then(() => res)
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

export function mockPutOk (url, returnValue) {
    fetchMock.put(S.unwrapUrl(url), returnValue !== undefined ? delay(returnValue) : delay(200))
}

export function mockDeleteOk (url, returnValue) {
    fetchMock.delete(S.unwrapUrl(url), returnValue !== undefined ? delay(returnValue) : delay(200))
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
