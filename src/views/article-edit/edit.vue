<template>
    <div>
        <div>
            <router-link
                :to="`/article/${article.id}/view`"
                :class="$style.backLink"
            >
                &lt;&lt;返回查看视图
            </router-link>
            <h3>
                修改: {{ article.title }}
            </h3>
        </div>
        <div class="split-line" />
        <h3>内容</h3>
        <edit-view
            ref="editView"
            :article="article"
        />
        <div class="split-line" />
        <div style="text-align: center; margin-top: 10px">
            <el-button
                type="success"
                @click="submitArticle"
            >
                提交
            </el-button>
        </div>
    </div>
</template>

<style lang="scss" module>
.card {
    background: white;
    padding: 15px;
    box-shadow: 2px 2px 3px lightgray;
    min-width: 480px;
    margin-bottom: 10px;
}

.back-link {
    text-decoration: none;
    color: #0c80ce;
    font-size: 14px;
}
</style>

<script>
import { getJsonResult, getResult } from '@/utils/server-wrapper'
import { putJson } from '@/utils/server'
import store from '@/store/store'
import nprogress from 'nprogress'
import EditView from './edit-view'
import eventBus from '@/utils/event-bus'

export default {
    components: {
        EditView
    },
    data () {
        return {
            article: {
                files: []
            }
        }
    },
    methods: {
        async submitArticle () {
            const isArticleValid = this.$refs.editView.check()
            if (isArticleValid) {
                await getResult(putJson(`/article/${this.article.id}/resource`, this.article))
                eventBus.$emit('showMessage', {
                    showClose: true,
                    type: 'success',
                    message: '修改成功!'
                })
                this.$router.push(`/article/${this.article.id}/view`)
            }
        }
    },
    async beforeRouteUpdate (to, from, next) {
        const id = to.params.id
        this.article = await getArticleData(id)
        const user = this.$store.getters.user
        if (user.id !== this.article.creatorId) {
            next('/error?code=403')
        } else {
            next()
        }
    },
    async beforeRouteEnter (to, from, next) {
        const id = to.params.id
        const article = await getArticleData(id)
        const user = store.getters.user
        console.log('article is', article)
        if (user.id !== article.creatorId) {
            next('/error?code=403')
        } else {
            nprogress.set(0.8)
            next(vm => {
                vm.$data.article = article
            })
        }
    }
}

function getArticleData (id) {
    return getJsonResult(`/article/${id}/resource`)
}
</script>
