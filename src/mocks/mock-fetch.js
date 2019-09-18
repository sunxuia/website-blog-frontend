import { Random } from 'mockjs'
import * as M from './mock-fetch-utils'

M.mockGetOk({ path: '/login/status', gateway: true }, {
    id: Random.integer(),
    name: '王大拿',
    roles: ['ROLE_NORMAL']
})

M.mockGetOk('/articles/latest?count=5', () => M.mockList({
    'id|+1': Random.integer(),
    title: '@ctitle',
    createTime: '@date(\'yyyy-MM-dd HH:mm:ss.SS+0800\')',
    editTime: '@date(\'yyyy-MM-dd HH:mm:ss.SS+0800\')',
    text: '@cparagraph',
    creator: {
        'id|+1': Random.integer(),
        name: '@cname',
        avatarUrl: 'https://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg'
    },
    'like|0-300': Random.integer()
}, 5))

M.mockGetOk('/articles/latest?count=20', () => M.mockList({
    'id|+1': Random.integer(),
    title: '@ctitle',
    createTime: '@date(\'yyyy-MM-dd HH:mm:ss.SS+0800\')',
    editTime: '@date(\'yyyy-MM-dd HH:mm:ss.SS+0800\')',
    text: '@cparagraph',
    creator: {
        'id|+1': Random.integer(),
        name: '@cname',
        avatarUrl: 'https://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg'
    },
    'like|0-300': Random.integer()
}, 10))

M.mockMatchGetOk('path', '/articles/search', args => {
    return M.mockList({
        'id|+1': Random.integer(),
        title: '@ctitle',
        createTime: '@date(\'yyyy-MM-dd HH:mm:ss.SS+0800\')',
        editTime: '@date(\'yyyy-MM-dd HH:mm:ss.SS+0800\')',
        text: '@cparagraph',
        creator: {
            'id|+1': Random.integer(),
            name: '@cname',
            avatarUrl: 'https://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg'
        },
        'like|0-300': Random.integer()
    }, 10)
})

M.mockMatchGetOk('path', '/articles/search/count', new Response(123456))
