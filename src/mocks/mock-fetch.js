import Mock from 'mockjs'
import * as M from './mock-fetch-utils'
const Random = Mock.Random

M.mockGetOk({ path: '/login/status', gateway: true }, {
    id: Random.integer(),
    name: '王大拿',
    roles: ['ROLE_NORMAL'],
    avatarUrl: 'https://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg'
})

M.mockGetOk('/articles/breif/latest?count=5', () => mockMoreBreifArticleList(5))

function mockMoreBreifArticleList (count) {
    return M.mockList({
        'id|+1': Random.integer(0),
        title: '@ctitle',
        createTime: '@date(\'yyyy-MM-dd HH:mm:ss.SS+0800\')',
        editTime: '@date(\'yyyy-MM-dd HH:mm:ss.SS+0800\')',
        creator: {
            'id|+1': Random.integer(0),
            name: '@cname',
            avatarUrl: 'https://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg'
        }
    }, count)
}

M.mockGetOk('/articles/latest?count=20', () => () => mockBreifArticleList(10))

function mockBreifArticleList (count) {
    return M.mockList({
        'id|+1': Random.integer(0),
        title: '@ctitle',
        createTime: '@date(\'yyyy-MM-dd HH:mm:ss.SS+0800\')',
        editTime: '@date(\'yyyy-MM-dd HH:mm:ss.SS+0800\')',
        text: '@cparagraph',
        creator: {
            'id|+1': Random.integer(0),
            name: '@cname',
            avatarUrl: 'https://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg'
        },
        statistics: {
            'likeCount|0-300': 0,
            'viewCount|0-300': 0
        }
    }, count)
}

M.mockMatchGetOk('path', '/articles/search', () => mockBreifArticleList(10))

M.mockMatchGetOk('glob', '/article/*/detail', () => {
    return Mock.mock({
        id: 100,
        title: '@ctitle',
        createTime: '@date(\'yyyy-MM-dd HH:mm:ss.SS+0800\')',
        editTime: '@date(\'yyyy-MM-dd HH:mm:ss.SS+0800\')',
        contentType: 'markdown',
        content: `
## sub title

conent

column 1 | column 2 | column 3
--- | --- | --- |
cell1 | cell2 | cell 3
cell1 | cell2 | cell 3
        `,
        creatorId: 1000,
        statistics: {
            viewCount: 100,
            likeCount: 200,
            shareCount: 300,
            commentCount: 400
        }
    })
})

M.mockMatchGetOk('glob', '/article/*/aboutme', {
    liked: true,
    share: {
        weibo: true
    },
    commentIds: [100, 200]
})

M.mockMatchGetOk('regexp', '\\/article\\/\\d+\\/comments\\?.+', () => [Mock.mock({
    id: 100,
    contentType: 'markdown',
    content: '## title\n\nline',
    createTime: '@date(\'yyyy-MM-dd HH:mm:ss.SS+0800\')',
    creator: {
        'id|+1': Random.integer(0),
        name: '@cname',
        avatarUrl: 'https://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg'
    }
}), Mock.mock({
    id: 101,
    contentType: 'markdown',
    content: '@cparagraph',
    createTime: '@date(\'yyyy-MM-dd HH:mm:ss.SS+0800\')',
    creator: {
        'id|+1': Random.integer(0),
        name: '@cname',
        avatarUrl: 'https://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg'
    }
})])

M.mockMatchPostOk('glob', '/article/*/comment', () => Mock.mock({
    id: 200,
    contentType: 'markdown',
    content: '## title\n\nline',
    createTime: '@date(\'yyyy-MM-dd HH:mm:ss.SS+0800\')',
    creator: {
        'id|+1': Random.integer(0),
        name: '@cname',
        avatarUrl: 'https://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg'
    }
}))

M.mockMatchGetOk('glob', 'article/*/comments/count', new Response('101'), { status: 200 })

M.mockMatchPutOk('glob', '/article/*/like?like=true', () => new Response('201', { status: 200 }))
M.mockMatchPutOk('glob', '/article/*/like?like=false', () => new Response('199', { status: 200 }))

M.mockMatchGetOk('glob', '/user/*/info', Mock.mock({
    id: 100,
    name: '王大拿',
    avatarUrl: 'https://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg'
}))

M.mockMatchGetOk('glob', '/user/*/recent-article?count=5', mockMoreBreifArticleList(5))

M.mockMatchDeleteOk('glob', '/article/*', new Response('', {
    status: 200
}))
