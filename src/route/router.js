import Vue from 'vue'
import Router from 'vue-router'
import createRoutes from './routes'
import nprogress from 'nprogress'
import eventBus from '../utils/event-bus'

Vue.use(Router)

// 解决这个版本中的NavigationDuplicated 问题 (通过添加一个catch)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

export default () => {
    const router = new Router({
        base: process.env.VARIABLES.PUBLIC_PATH,
        routes: createRoutes(),
        mode: 'history',
        fallback: true,
        scrollBehavior (to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition
            } else {
                return { x: 0, y: 0 }
            }
        }
    })

    router.beforeEach((to, from, next) => {
        nprogress.start()
        if (to.matched.length) {
            next()
        } else {
            next('/error?code=404')
        }
    })
    router.afterEach((to, from) => {
        nprogress.done()
        eventBus.$emit('loading-end')
    })

    return router
}
