/* eslint-disable no-unused-vars */
import fetchMock from 'fetch-mock'

fetchMock.config.fallbackToNetwork = true

function delay (res) {
    return new Promise(resolve => setTimeout(resolve, 0)).then(() => res)
}

function mockGetOk (url, returnValue) {
    fetchMock.get(url, delay(returnValue))
}
