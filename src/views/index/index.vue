<template>
    <div :class="$style.root">
        <div>
            <article-card
                v-for="i in list"
                :key="i.id"
                :article="i"
            />
            <div style="text-align: center; margin: 10px">
                <el-button
                    class="el-icon-arrow-right"
                    :loading="loadingMore"
                    style="width: 100%;"
                    @click="loadMore"
                >
                    查看更多
                </el-button>
            </div>
        </div>
        <div>
            <right-side :class="$style.topSide" />
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

import { getJson } from '@/utils/server'
import { getResult } from '@/utils/server-wrapper'

export default {
    components: {
        ArticleCard,
        RightSide
    },
    data () {
        return {
            list: [],
            loadingMore: false
        }
    },
    methods: {
        async loadMore () {
            this.loadingMore = true
            const list = await getResult(getJson('/articles/latest?count=20'))
            this.list.push(...list)
            this.loadingMore = false
        }
    },
    async beforeRouteEnter (to, from, next) {
        const list = await getResult(getJson('/articles/latest?count=20'))
        nprogress.set(0.9)
        next(vm => {
            vm.$data.list = list
        })
    }
}
</script>
