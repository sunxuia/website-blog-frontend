/* eslint-disable no-unused-vars */
import fetchMock from 'fetch-mock'

const DELAY_MILLIS = 0

fetchMock.config.fallbackToNetwork = true

function delay (res) {
    return new Promise(resolve => setTimeout(resolve, DELAY_MILLIS)).then(() => res)
}

function mockGetOk (url, returnValue) {
    fetchMock.get(url, delay(returnValue))
}
