if (process.env.MOCK_FETCH) {
    require('./mocks/mock-fetch')
    console.log('mock-fetch included')
}
import('./main')
