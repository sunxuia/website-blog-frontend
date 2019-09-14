beforeEach(() => {
    document.body.innerHTML = '<div id="app" />'
})

it('should mount app', () => {
    require('@/main')
    expect(document.querySelector('#app').innerHTML).toBeTruthy()
})
