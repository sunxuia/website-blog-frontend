<template>
    <div :class="$style.card">
        <router-link
            :to="`/article/${article.id}/view`"
            :class="$style.cardTitle"
        >
            {{ article.title }}
        </router-link>
        <div :class="[$style.cardInfo, 'children-justify']">
            <div>
                <img
                    :class="$style.cardTitleAvatar"
                    :src="article.creator.avatarUrl"
                >
                <span>{{ article.creator.name }}</span>
            </div>
            <div>
                <span>创建于 {{ getRelativeDate(article.createTime) }}</span>
                <span v-if="hasEdit"> (修改于 {{ getRelativeDate(article.editTime) }})</span>
            </div>
        </div>
        <p :class="$style.cardBodyText">
            {{ article.text }}
        </p>
    </div>
</template>

<style lang="scss" module>
.card {
    background: white;
    margin: 6px 10px 6px 10px;
    padding: 15px;
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
</style>

<script>
import { getDate, format } from '@/utils/date-utils'

export default {
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    computed: {
        hasEdit () {
            console.log('editTime', this.article.editTime)
            return this.article.editTime && this.article.editTime !== this.article.createTime
        }
    },
    methods: {
        getRelativeDate (time) {
            if (!(time instanceof Date)) {
                time = new Date(time)
            }
            const dayCount = 24 * 60 * 60 * 1000
            const now = new Date()
            const interval = now.getTime() - time.getTime()
            if (interval < 60 * 60 * 1000) {
                return Math.ceil(interval / dayCount, 1) + '天后'
            }
            if (interval <= 0) {
                return '即将'
            }
            if (interval < 1 * 60 * 1000) {
                return '刚刚'
            }
            if (now - getDate(time).getTime() < 24 * 60 * 60 * 1000) {
                return format(time, 'HH:mm')
            }
            if (now.getFullYear() === time.getFullYear()) {
                return format(time, 'MM:dd')
            }
            return format(time, 'yyyy-MM-dd')
        }
    }
}
</script>
