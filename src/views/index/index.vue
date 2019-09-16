<template>
    <div>
        <article-card
            v-for="i in list"
            :key="i.id"
            :article="i"
        />
    </div>
</template>

<script>
import nprogress from 'nprogress'
import ArticleCard from './article-card'
// import RightSide from './right-side'

import { getJson } from '@/utils/server'
import { getResult } from '@/utils/server-wrapper'

export default {
    components: {
        ArticleCard
        // RightSide
    },
    data () {
        return {
            list: []
        }
    },
    async beforeRouteEnter (to, from, next) {
        const list = await getResult(getJson('/articles'))
        nprogress.set(0.9)
        next(vm => {
            vm.$data.list = list
        })
    }
}
</script>
