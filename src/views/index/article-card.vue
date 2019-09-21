<template>
    <div :class="$style.card">
        <!-- eslint-disable vue/no-v-html -->
        <router-link
            :to="`/article/${article.id}/view`"
            :class="$style.cardTitle"
            v-html="wrapSearchText(article.title)"
        />
        <div :class="[$style.cardInfo, 'children-justify']">
            <div>
                <img
                    :class="$style.cardTitleAvatar"
                    :src="article.creator.avatarUrl"
                >
                <span>{{ article.creator.name }}</span>
            </div>
            <div style="font-size: 14px;">
                <el-popover
                    v-if="hasEdit"
                    placement="top-start"
                    trigger="hover"
                    size="mini"
                    :content="getRelativeDate(article.createTime) + '创建'"
                >
                    <span
                        slot="reference"
                        style="color: darkgrey; text-decoration: underline; cursor: pointer"
                    > {{ getRelativeDate(article.editTime) }} 编辑</span>
                </el-popover>
                <span v-else>{{ getRelativeDate(article.createTime) }} 创建</span>
            </div>
        </div>
        <p
            :class="$style.cardBodyText"
            v-html="wrapSearchText(article.text)"
        />
        <!-- eslint-enable vue/no-v-html -->
        <div :class="$style.foot">
            <span class="sxci-eye">{{ article.statistics.viewCount }}</span>
            <span class="sxci-like">{{ article.statistics.likeCount }}</span>
        </div>
    </div>
</template>

<style lang="scss" module>
.card {
    background: white;
    margin: 6px 10px 6px 10px;
    padding: 15px 15px 5px 15px;
    box-shadow: 2px 2px 3px lightgray;
}

.card-title {
    margin: 5px;
    text-decoration: none;
    font-size: 20px;
    font-weight: bolder;
    color: black;
}

.card-info {
    margin: 5px;
    padding-right: 10px;
    font-size: 16px;
}

.card-title-avatar {
    width: 30px;
    height: 30px;
    vertical-align: middle;
}

.card-body {
    margin-left: 5px;
    margin-right: 5px;
}

.card-body-text {
    margin-top: 5px;
    margin-bottom: 5px;

    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}

.search-text {
    color: red;
}

.foot span {
    font-size: 14px;
}
</style>

<script>
import { getRelativeDate } from '@/utils/date-utils'
import { encode as htmlEncode } from '@/utils/html-code'
import { encode as regExpEncode } from '@/utils/regexp-utils'

export default {
    props: {
        article: {
            type: Object,
            required: true
        },
        searchText: {
            type: String,
            default: ''
        }
    },
    computed: {
        hasEdit () {
            return this.article.editTime && this.article.editTime !== this.article.createTime
        }
    },
    methods: {
        getRelativeDate (time) {
            return getRelativeDate(time)
        },
        wrapSearchText (text) {
            let res = htmlEncode(text)
            if (this.searchText) {
                res = res.replace(new RegExp(regExpEncode(this.searchText), 'g'),
                    `<span class="${this.$style.searchText}">${this.searchText}</span>`)
            }
            return res
        }
    }
}
</script>
