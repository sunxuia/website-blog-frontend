export default () => [{
    path: '/error',
    component: () => import('@/views/error/code')
}, {
    path: '/',
    component: () => import('@/views/layout/layout'),
    children: functionRoute()
}]

function functionRoute () {
    const res = []

    function addView (urlPath, componentPath) {
        res.push({
            path: urlPath,
            component: () => import(`@/views/${componentPath}`)
        })
    }

    // function addRedirect (path, redirect) {
    //     res.push({ path, redirect })
    // }

    addView('/', 'index/index')
    addView('/search', 'index/search')
    addView('/article/:id/view', 'article-view/view')

    return res
}
