<template>
    <div :class="$style.root">
        <div style="flex-grow:1">
            <div
                :class="$style.card"
                style="padding-top: 1px"
            >
                <h3>{{ article.title }}</h3>
                <div
                    class="children-justify"
                    style="font-size: 14px"
                >
                    <div>
                        <span>{{ getRelativeDate(article.createTime) }} 创建</span>
                        <span v-if="hasEdit"> ({{ getRelativeDate(article.editTime) }} 编辑)</span>
                    </div>
                    <div><span class="sxci-eye" /><span style="margin-top: 10px">{{ statistics.viewCount }}</span></div>
                </div>
            </div>
            <management
                v-if="!showManagement"
                :class="$style.card"
                :article="article"
            />
            <div :class="$style.card">
                <!-- eslint-disable next-line vue/no-v-html -->
                <p v-html="contentHtml" />
                <div class="split-line" />
                <div class="children-justify">
                    <div>
                        <el-button
                            :disabled="!isLoggedIn"
                            type="text"
                            style="color: orange; font-size: 16px;"
                            :class="meData.liked ? 'sxci-like-fill' : 'sxci-like'"
                            @click="onLike"
                        >
                            {{ statistics.likeCount }}
                        </el-button>
                    </div>
                    <share-bar
                        :article="article"
                        :share="meData.share"
                        :statistics="statistics"
                    />
                </div>
            </div>
            <comments
                :class="$style.card"
                :article-id="article.id"
            />
        </div>
        <right-side :creator-id="article.creatorId" />
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

.card {
    background: white;
    margin: 6px 10px 6px 10px;
    padding: 15px;
    box-shadow: 2px 2px 3px lightgray;
    min-width: 480px;
}
</style>

<script>
import nprogress from 'nprogress'
import RightSide from './right-side'
import ShareBar from './share-bar'
import Comments from './comment/comments'
import { getRelativeDate } from '@/utils/date-utils'
import { getJsonResult, getResult } from '@/utils/server-wrapper'
import { putData } from '@/utils/server'
import { Remarkable } from 'remarkable'
import store from '@/store/store'
import { encode as htmlEncode } from '@/utils/html-code'
import Management from './management'

export default {
    components: {
        RightSide,
        Comments,
        ShareBar,
        Management
    },
    data () {
        return {
            article: {
                id: 0,
                statistics: {},
                creatorId: 0
            },
            meData: {
                share: {}
            }
        }
    },
    computed: {
        statistics () {
            return this.article.statistics
        },
        hasEdit () {
            return this.article.editTime && this.article.editTime !== this.article.createTime
        },
        contentHtml () {
            const content = this.article.content
            const type = this.article.contentType
            if (type === 'markdown') {
                var md = new Remarkable()
                return md.render(content)
            }
            return htmlEncode(content)
        },
        isLoggedIn () {
            return !!this.$store.getters.user.id
        },
        showManagement () {
            return this.article.id === this.$store.getters.user.id
        }
    },
    methods: {
        async onLike () {
            const like = !this.meData.liked
            const likeCount = await getResult(putData(`/article/${this.article.id}/like?like=${like}`)
                .then(i => i.text()))
            this.statistics.likeCount = Number.parseInt(likeCount)
            this.meData.liked = like
        },
        getRelativeDate (date) {
            return getRelativeDate(date)
        }
    },
    async beforeRouteUpdate (to, from, next) {
        const id = to.params.id
        this.article = getArticleData(id)
        if (this.isLoggedIn) {
            this.meData = await getMeData(id)
        } else {
            this.meData = {}
        }
        next()
    },
    async beforeRouteEnter (to, from, next) {
        const id = to.params.id
        const article = await getArticleData(id)
        let meData = {}
        const isLoggedIn = store.getters.user.id
        if (isLoggedIn) {
            meData = await getMeData(id)
        }
        nprogress.set(0.8)
        next(vm => {
            vm.$data.article = article
            vm.$data.meData = meData
        })
    }
}

function getArticleData (id) {
    return getJsonResult(`/article/${id}/detail`)
}

function getMeData (id) {
    return getJsonResult(`/article/${id}/aboutme`)
}
</script>
