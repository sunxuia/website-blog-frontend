<template>
    <div
        ref="commentListArea"
        :style=" { height: commentsLoadEnd ? '' : '100px' }"
    >
        <div v-if="commentCount == 0">
            <p style="color: #CEC7CE; font-size: 20px; text-align: center; margin-top: 10px; cursor: default;">
                尚无评论
            </p>
        </div>
        <single-comment
            v-for="i in commentList"
            :key="i.id"
            :comment="i"
        />
        <div
            v-show="commentCount > commentPageSize"
            :class="$style.paginationClass"
        >
            <el-pagination
                :current-page="commentPageIndex"
                :page-sizes="[20, 50, 100]"
                :page-size="commentPageSize"
                :total="commentCount"
                layout="total, prev, pager, next, jumper"
                @size-change="pageSizeChanged"
                @current-change="pageIndexChanged"
            />
        </div>
    </div>
</template>

<style lang="scss" module>
.loading {
    color: orange;

    circle {
        stroke: orange !important;
    }

    :global(.el-loading-text) {
        color: orange;
    }
}

.paginationClass {
    text-align: center;
}
</style>

<script>
import { getJsonResult } from '@/utils/server-wrapper'
import { Loading } from 'element-ui'
import nprogress from 'nprogress'
import SingleComment from './single-comment'

export default {
    components: {
        SingleComment
    },
    props: {
        articleId: {
            type: Number,
            required: true
        },
        commentCount: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            commentsLoaded: false,
            commentsLoadEnd: false,
            commentPageSize: 20,
            commentPageIndex: 1,
            commentsLoadingInstance: null,
            commentList: []
        }
    },
    watch: {
        articleId (newValue, oldValue) {
            if (!newValue && newValue !== oldValue) {
                this.commentsLoaded = false
                this.initialCommentsLoading()
            }
        }
    },
    mounted () {
        this.initialCommentsLoading()
    },
    methods: {
        isElementInViewport () {
            const box = this.$refs.commentListArea.getBoundingClientRect()
            const top = box.top >= 0
            const left = box.left >= 0
            const bottom = box.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            const right = box.right <= (window.innerWidth || document.documentElement.clientWidth)
            const res = top && left && bottom && right
            return res
        },
        initialCommentsLoading () {
            this.startLoading()
            if (this.isElementInViewport()) {
                this.loadComments()
            } else {
                window.addEventListener('scroll', this.handleScroll)
            }
        },
        handleScroll () {
            if (!this.commentsLoaded && this.isElementInViewport()) {
                window.removeEventListener('scroll', this.handleScroll)
                this.loadComments()
            }
        },
        async loadComments () {
            this.commentsLoaded = true
            this.commentList = await getJsonResult({
                path: `/article/${this.articleId}/comment/list`,
                query: {
                    pageIndex: this.commentPageIndex,
                    pageSize: this.commentPageSize
                }
            })
            this.commentsLoadEnd = true
            this.endLoading()
        },
        async pageSizeChanged (newPageSize) {
            nprogress.start()
            this.commentPageSize = newPageSize
            nprogress.set(0.8)
            this.commentList = await this.getComments()
            nprogress.done()
        },
        async pageIndexChanged (newPageIndex) {
            nprogress.start()
            this.commentPageIndex = newPageIndex
            nprogress.set(0.8)
            this.commentList = await this.getComments()
            nprogress.done()
        },
        getComments () {
            return getJsonResult({
                path: `/article/${this.articleId}/comments`,
                query: {
                    pageIndex: this.commentPageIndex,
                    pageSize: this.commentPageSize
                }
            })
        },
        startLoading () {
            this.commentsLoadingInstance = Loading.service({
                target: this.$refs.commentListArea,
                text: '评论加载中~',
                customClass: this.$style.loading
                // background: 'white'
            })
        },
        endLoading () {
            this.$nextTick(() => {
                this.commentsLoadingInstance.close()
            })
        },
        addComment (newComment) {
            this.commentList.splice(0, 0, newComment)
            this.commentCount++
        }
    }
}
</script>
