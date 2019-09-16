import * as M from './mock-fetch-utils'

M.mockGetOk({ path: '/login/status', gateway: true }, {
    id: 100,
    name: '王大拿',
    roles: ['ROLE_NORMAL']
})

M.mockGetOk('/articles', M.mockList({
    'id|+1': 100,
    title: '@ctitle',
    createTime: '@date(\'yyyy-MM-dd HH:mm:ss.SS+0800\')',
    editTime: '@date(\'yyyy-MM-dd HH:mm:ss.SS+0800\')',
    text: '@cparagraph',
    creator: {
        'id|+1': 1000,
        name: '@cname',
        avatarUrl: 'https://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg'
    },
    'like|0-300': 100
}, 10))
