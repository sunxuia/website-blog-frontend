<template>
    <div :class="$style.root">
        <p>内容</p>
    </div>
</template>

<style lang="scss" module>
.root {
    color: red;
}
</style>

<script>
import nprogress from 'nprogress'
// import * as Server from '@/utils/server'

export default {
    async beforeRouteEnter (to, from, next) {
        nprogress.set(0.8)
        next()
    }
}
</script>
