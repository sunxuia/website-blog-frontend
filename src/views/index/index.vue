<template>
    <div :class="$style.root">
        <div style="flex-grow:1">
            <article-card
                v-for="i in list"
                :key="i.id"
                :article="i"
            />
            <div style="text-align: center; margin: 10px">
                <el-button
                    :class="canLoadMore ? 'el-icon-arrow-right' : ''"
                    :loading="loadingMore"
                    style="width: 100%;"
                    :disabled="!canLoadMore"
                    @click="loadMore"
                >
                    {{ canLoadMore ? '查看更多' : '没有了 ╮(╯_╰)╭' }}
                </el-button>
            </div>
        </div>
        <div>
            <right-side />
        </div>
    </div>
</template>

<style lang="scss" module>
.root {
    display: flex;
    justify-content: center;
    @media screen and(min-width: 768px) {
        flex-direction: row;
    }
    @media screen and(max-width: 768px) {
        flex-direction: column-reverse;
    }
}
</style>

<script>
import nprogress from 'nprogress'
import ArticleCard from './article-card'
import RightSide from './right-side'

import { getJsonResult } from '@/utils/server-wrapper'

export default {
    components: {
        ArticleCard,
        RightSide
    },
    data () {
        return {
            list: [],
            loadingMore: false,
            canLoadMore: true
        }
    },
    methods: {
        async loadMore () {
            this.loadingMore = true
            const lastTimeKey = this.list.length > 0
                ? this.list[this.list.length - 1].timeKey : null
            const list = await getJsonResult({
                path: '/articles/latest',
                query: {
                    count: 20,
                    lastTimeKey
                }
            })
            this.list.push(...list)
            this.canLoadMore = list.length === 20
            this.loadingMore = false
        }
    },
    async beforeRouteEnter (to, from, next) {
        const list = await getJsonResult('/articles/latest?count=20')
        nprogress.set(0.9)
        next(vm => {
            vm.$data.list = list
        })
    }
}
</script>
