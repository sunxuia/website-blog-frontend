if (process.env.MOCK_FETCH) {
    require('./mock-fetch')
    console.log('mock-fetch included')
}
import('../src/main')
