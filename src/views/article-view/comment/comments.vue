<template>
    <div ref="root">
        <b>评论</b>
        <div class="split-line" />
        <comment-input
            :article-id="articleId"
            @addComment="addComment"
        />
        <div
            class="split-line"
            style="margin-top: 10px; margin-bottom: 10px;"
        />
        <comment-list
            ref="commentList"
            :article-id="articleId"
        />
    </div>
</template>

<script>
import CommentList from './comment-list'
import CommentInput from './comment-input'

export default {
    components: {
        CommentList,
        CommentInput
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
    methods: {
        addComment (newComment) {
            this.$refs.commentList.addComment(newComment)
        }
    }
}
</script>
