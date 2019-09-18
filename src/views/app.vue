<template>
    <div id="app">
        <transition>
            <router-view />
        </transition>
    </div>
</template>

<script>
import eventBus from '@/utils/event-bus'
export default {
    mounted () {
        eventBus.$on('showMessage', args => {
            if (typeof args.message === 'function') {
                args.message = args.message(this.$createElement)
            }
            this.$message(args)
        })
    }
}
</script>
