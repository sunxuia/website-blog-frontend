import * as M from './mock-fetch-utils'

M.mockGetOk({ path: '/login/status', gateway: true }, {
    id: 100,
    name: '王大拿',
    roles: ['ROLE_NORMAL']
})
