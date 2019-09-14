import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/views/hello-world'

describe('test <hello-world />', () => {
    it('should render corrently', () => {
        const wrapper = shallowMount(HelloWorld)
        expect(wrapper.find('div.red').text()).toEqual('hello world')
    })
})
