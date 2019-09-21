<template>
    <div :class="$style.root">
        <div style="flex-grow:1">
            <div style="margin-left: 10px; margin-right: 10px;">
                <search-content :search-text="searchText" />
                <p v-if="searchText">
                    <span>共找到{{ count }} 个"<b>{{ searchText }}</b>"相关结果</span>
                    <span v-show="count > pageSize">, 现在显示第{{ resultListStartIndex }} 到第{{ resultListEndIndex }} 个结果</span>.
                </p>
                <p v-else>
                    准备搜索
                </p>
            </div>
            <article-card
                v-for="i in list"
                :key="i.id"
                :article="i"
                :search-text="searchText"
            />
            <div
                v-show="searchText && count > pageSize"
                :class="$style.paginationClass"
            >
                <el-pagination
                    :current-page="pageIndex"
                    :page-sizes="[20, 50, 100]"
                    :page-size="pageSize"
                    :total="count"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="pageSizeChanged"
                    @current-change="pageIndexChanged"
                />
            </div>
        </div>
        <right-side />
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

.paginationClass {
    margin-top: 10px;
    text-align: center;
}
</style>

<script>
import nprogress from 'nprogress'
import ArticleCard from './article-card'
import RightSide from './right-side'
import SearchContent from '@/components/search-content'

import { getJson, getText } from '@/utils/server'
import { getResult } from '@/utils/server-wrapper'

function getSearchResult (text, pageIndex, pageSize) {
    return getResult(getJson({
        path: '/articles/search',
        query: {
            text,
            pageIndex,
            pageSize
        }
    }))
}

function getSearchTotal (text) {
    return getResult(getText({
        path: '/articles/search/count',
        query: { text }
    }))
}

export default {
    components: {
        ArticleCard,
        RightSide,
        SearchContent
    },
    data () {
        return {
            list: [],
            count: 0,
            searchText: '',
            pageIndex: 1,
            pageSize: 20

        }
    },
    computed: {
        resultListStartIndex () {
            return (this.pageIndex - 1) * this.pageSize + 1
        },
        resultListEndIndex () {
            let end = this.pageIndex * this.pageSize
            if (end > this.count) {
                end = this.count
            }
            return end
        }
    },
    methods: {
        async pageSizeChanged (newPageSize) {
            nprogress.start()
            this.pageSize = newPageSize
            nprogress.set(0.8)
            this.list = await getSearchResult(this.searchText, this.pageIndex, this.pageSize)
            nprogress.done()
        },
        async pageIndexChanged (newPageIndex) {
            nprogress.start()
            this.pageIndex = newPageIndex
            nprogress.set(0.8)
            this.list = await getSearchResult(this.searchText, this.pageIndex, this.pageSize)
            nprogress.done()
        }
    },
    async beforeRouteUpdate (to, from, next) {
        const text = to.query.text
        if (text) {
            this.list = await getSearchResult(text)
            this.searchText = text
        } else {
            this.list = []
            this.searchText = ''
        }
        nprogress.done()
    },
    async beforeRouteEnter (to, from, next) {
        const text = to.query.text
        if (text) {
            Promise.all([getSearchResult(text, 20, 1), getSearchTotal(text)])
                .then(res => {
                    nprogress.set(0.9)
                    next(vm => {
                        vm.$data.list = res[0]
                        vm.$data.count = res[1] ? Number.parseInt(res[1]) : 0
                        vm.$data.searchText = text
                    })
                })
        } else {
            next()
        }
    }
}
</script>
