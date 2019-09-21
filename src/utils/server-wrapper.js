import eventBus from './event-bus'
import * as server from './server'

export function errorHint (error) {
    const details = (error.status ? error.status + ' ' : '') + error.statusText

    let message
    if (error.message) {
        message = h => (
            <div>
                <div font-size="20px">{details}</div>
                <div font-size="10px">{error.message}</div>
            </div>
        )
    } else {
        message = details
    }

    eventBus.$emit('showMessage', {
        showClose: true,
        type: 'error',
        message
    })
}

export async function getResult (promise) {
    return promise.catch(e => {
        errorHint(e)
        throw e
    })
}

export async function getJsonResult (url, arg = {}) {
    return getResult(server.getJson(url, arg))
}
