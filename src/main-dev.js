if (process.env.MOCK_FETCH === 'true') {
    require('./mocks/mock-fetch')
}
import('./main')
