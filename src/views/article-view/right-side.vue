<template>
    <div :class="$style.root">
        <div style="text-align: center">
            <el-avatar
                :size="100"
                fit="fill"
                :src="creator.avatarUrl"
            />
            <p>{{ creator.name }}</p>
        </div>
        <div class="split-line" />
        <div>
            <b><small>他的最新内容</small></b>
            <router-link
                v-for="a in recentArticles"
                :key="a.id"
                :to="`/article/${a.id}/view`"
                :class="$style.link"
            >
                {{ a.title }}
            </router-link>
        </div>
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
    margin-left: 0px;
    padding: 5px;

    &:hover {
        background: lightgray;
    }
}
</style>

<script>
import { getJsonResult } from '@/utils/server-wrapper'

export default {
    props: {
        creatorId: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            creator: {},
            recentArticles: []
        }
    },
    watch: {
        creatorId (newValue, oldValue) {
            if (newValue && newValue !== oldValue) {
                this.refreshData()
            }
        }
    },
    methods: {
        async refreshData () {
            this.creator = await getJsonResult(`/user/${this.creatorId}/info`)
            this.recentArticles = await getJsonResult(`/user/${this.creatorId}/recent-article?count=5`)
        }
    }
}
</script>
