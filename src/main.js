import Vue from 'vue'
import store from './store/store'
import createRouter from './route/router'
import Meta from 'vue-meta'
import App from './app'

Vue.use(Meta)

const isProduction = process.env.NODE_ENV === 'production'
Vue.config.productionTip = !isProduction

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
