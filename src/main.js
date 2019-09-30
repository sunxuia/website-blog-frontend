import './styles/global.scss'
import './assets/icon/iconfont.css'
import Vue from 'vue'
import store from './store/store'
import createRouter from './route/router'
import Meta from 'vue-meta'
import App from './views/app'
import './components/element-ui'
import './components/nprogress'
import eventBus from './utils/event-bus'
import { getJson } from '@/utils/server'

Vue.use(Meta)

const isProduction = process.env.NODE_ENV === 'production'
Vue.config.productionTip = !isProduction

function removeInitialLoadingAnimation () {
    document.querySelector('#initial-loading').remove()
    eventBus.$off('loading-end', removeInitialLoadingAnimation)
}
eventBus.$on('loading-end', removeInitialLoadingAnimation)

getJson({ path: '/login/status', gateway: true }).then(user => {
    if (user == null) {
        user = {}
    } else {
        store.commit('setUser', user)
        getJson({
            path: process.env.VARIABLES.USER_PATH_PREFIX + '/me/info',
            absolute: true
        }).then(info => {
            store.commit('setUser', info)
        })
    }

    const app = new Vue({
        el: '#app',
        store,
        router: createRouter(),
        components: {
            App
        },
        template: '<App />'
    })
    Vue.use(app)
}).catch(e => {
    document.querySelector('#initial-loading').innerHTML = `
    <p>发生了错误(╯°Д°)╯</p>
    <p>${e.message || (e.status ? e.status + ' ' : '') + e.statusText}</p>
    `
})
