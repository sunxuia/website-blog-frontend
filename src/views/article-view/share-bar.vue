<template>
    <div>
        <span style="vertical-align: middle;">
            <span style="color: orange">{{ statistics.shareCount }}</span>
            <span>分享</span>
        </span>
        <el-button
            :class="$style.btn"
            size="mini"
            type="text"
            @click="shareLink('weibo')"
        >
            <span :class="[$style.shareIcon, 'sxci-weibo', share.weibo ? $style.active : '']" />
        </el-button>
        <el-button
            :class="$style.btn"
            size="mini"
            type="text"
            @click="shareLink('twitter')"
        >
            <span :class="[$style.shareIcon, 'sxci-twitter', share.wechat ? $style.active : '']" />
        </el-button>
        <el-button
            :class="$style.btn"
            size="mini"
            type="text"
            @click="shareLink('qq')"
        >
            <span :class="[$style.shareIcon, 'sxci-QQ', share.qq ? $style.active : '']" />
        </el-button>
    </div>
</template>

<style lang="scss" module>
.btn {
    margin: 0 !important;
    padding: 0;
    width: 30px;
}

.share-icon {
    color: grey;
    font-size: 30px;
}

.active {
    color: orange;
}
</style>

<script>
import { unwrapUrl } from '@/utils/server'

export default {
    props: {
        article: {
            type: Object,
            required: true
        },
        share: {
            type: Object,
            required: true
        },
        statistics: {
            type: Object,
            required: true
        }
    },
    methods: {
        shareLink (socialMediaType) {
            this.$set(this.share, socialMediaType, true)
            this.statistics.shareCount += 1

            const width = 300; const height = 400
            const xPos = (screen.width - width) / 2
            const yPos = (screen.height - height) / 2
            const shareUrl = unwrapUrl(`/article/${this.article.id}/share&mediaType=${socialMediaType}`)
            window.open(shareUrl, 'newwindow',
                `height=${height}, 
                width=${width}, 
                toolbar=no, 
                menubar=no, 
                scrollbars=no, 
                resizable=1, 
                location=no, 
                status=no, 
                screenx=${xPos}, 
                screeny=${yPos}, 
                left=${xPos}, 
                top=${yPos}`)
        }
    }
}
</script>
