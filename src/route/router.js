import Vue from 'vue'
import Router from 'vue-router'
import createRoutes from './routes'

Vue.use(Router)

export default () => {
    console.log('public path is', process.env.VARIABLES)
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
        // console.log('from', from.fullPath, 'to', to.fullPath)
        next()
    })
    return router
}
