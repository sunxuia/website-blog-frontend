<template>
    <div :class="$style.header">
        <div style="display: flex;">
            <router-link
                ref="index"
                :class="$style.headerItem"
                to="/"
            >
                <img
                    :src="logo"
                    style="width: 30px; height: 30px; vertical-align:middle;"
                >
                <span>任务中心</span>
            </router-link>
        </div>
        <search-content />
        <div :class="$style.userName">
            <a
                v-if="!isLoggedIn"
                href="/login"
            >登录</a>
            <a
                v-else
                :href="logoutUrl"
            >{{ userName }}</a>
        </div>
    </div>
</template>

<style lang="scss" module>
.header {
    color: #fefefe;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
}

.header-item {
    margin: 0 5px 0 5px;
    padding: 0 10px 0 10px;
    font-weight: bold;
    font-size: 20px;
    color: #ffffff;
    text-decoration: none;
    vertical-align: middle;
}

.user-name {
    font-size: 20px;

    a {
        color: white;
        text-decoration: none;
    }
}
</style>

<script>
import SearchContent from './search-content'
import logo from '@/../logo.png'

export default {
    components: {
        SearchContent
    },
    data () {
        return {
            collapse: false,
            loginUrl: process.env.VARIABLES.GATEWAY_PATH_PREFIX + '/login/redirect?redirect=' + encodeURIComponent(document.location),
            logoutUrl: process.env.VARIABLES.LOGOUT_URL,
            logo
        }
    },
    computed: {
        userName () {
            return this.$store.getters.user.name
        },
        isLoggedIn () {
            return !!this.$store.getters.user
        }
    },
    methods: {
    }
}
</script>
