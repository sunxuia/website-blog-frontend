<template>
    <div :class="$style.root">
        <div
            v-if="isLoggedIn"
            :class="$style.function"
        >
            <router-link
                to="/article/create"
                :class="$style.link"
                style="padding-top: 15px; padding-bottom: 15px"
            >
                新建文章
            </router-link>
        </div>
        <div
            v-else
            :class="$style.function"
        >
            <a
                v-if="!isLoggedIn"
                :href="loginUrl"
            >登录使用更多功能</a>
        </div>
        <div class="split-line" />
        <div>
            <b><small>最新内容</small></b>
            <router-link
                v-for="a in latestArticles"
                :key="a.id"
                :to="`/article/${a.id}/view`"
                :class="$style.link"
            >
                {{ a.creator.name }} : {{ a.title }}
            </router-link>
        </div>
        <div class="split-line" />
        <div>
            <a
                :class="$style.link"
                href="https://github.com/sunxuia/website-blog-frontend"
                target="_blank"
            >
                <img
                    src="https://github.com/fluidicon.png"
                    style="width: 20px; height: 20px; vertical-align:middle;"
                >
                <span style="vertical-align: middle;">源代码 Github</span>
            </a>
            <p style="margin-left: 10px">
                <small>此网站仅用于演示</small>
            </p>
        </div>
        <div :class="[ 'split-line', $style.lastHr ]" />
    </div>
</template>

<style lang="scss" module>
.root {
    margin: 10px;
    padding: 15px;
    @media screen and(min-width: 768px) {
        min-width: 250px;
    }
    @media screen and(max-width: 768px) {
        width: 100%;
    }

    & > div {
        width: 100%;
    }
}

.link {
    text-decoration: none;
    color: black;
    width: 100%;
    display: block;
    margin: 5px;
    padding: 5px 5px 5px 10px;

    &:hover {
        background: lightgray;
    }
}

.function {
    margin-left: -5px;

    .link {
        margin-left: 0px;
    }
}

.last-hr {
    @media screen and(min-width: 768px) {
        visibility: hidden;
    }
    @media screen and(max-width: 768px) {
        visibility: visible;
    }
}
</style>

<script>
import { getJson } from '@/utils/server'
import { getResult } from '@/utils/server-wrapper'

export default {
    data () {
        return {
            latestArticles: [],
            loginUrl: process.env.VARIABLES.GATEWAY_PATH_PREFIX +
                '/login/redirect?redirect=' + encodeURIComponent(document.location)
        }
    },
    computed: {
        isLoggedIn () {
            return this.$store.getters.user.id
        }
    },
    async mounted () {
        this.latestArticles = await getResult(getJson('/articles/latest/basic?count=5'))
    }
}
</script>
