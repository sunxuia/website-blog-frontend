<template>
    <div :class="['children-justify', $style.root]">
        <div>
            <el-avatar
                :size="70"
                fit="fill"
                :src="comment.creator.avatarUrl"
            />
        </div>
        <div :class="$style.commentArea">
            <div :class="['children-justify', $style.commentTitle]">
                <span>{{ comment.creator.name }}</span>
                <span>{{ getRelativeDate(comment.createTime) }}</span>
            </div>
            <!-- eslint-disable next-line vue/no-v-html -->
            <div
                :class="$style.htmlContent"
                v-html="contentHtml"
            />
        </div>
    </div>
</template>

<style lang="scss" module>
.root {
    align-items: flex-start;
    margin-bottom: 5px;
    border-bottom: 1px solid lightgray;
}

.comment-area {
    flex-grow: 1;
    text-align: right;
    text-align: left;
}

.comment-title {
    font-size: 14px;
    margin-right: 5px;
}

.html-content > p {
    margin-top: 2px;
    margin-bottom: 5px;
}
</style>

<script>
import { getRelativeDate } from '@/utils/date-utils'
import { Remarkable } from 'remarkable'
import { encode as htmlEncode } from '@/utils/html-code'

export default {
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    computed: {
        contentHtml () {
            const content = this.comment.content
            const type = this.comment.contentType
            if (type === 'markdown') {
                var md = new Remarkable()
                return md.render(content)
            }
            return htmlEncode(content)
        }
    },
    methods: {
        getRelativeDate (time) {
            return getRelativeDate(time)
        }
    }
}
</script>
