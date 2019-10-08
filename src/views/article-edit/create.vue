<template>
    <div>
        <div>
            <h3>创建</h3>
            <el-form
                ref="titleForm"
                :model="article"
                :rules="titleRules"
                enctype="multipart/form-data"
                :class="$style.card"
            >
                <el-form-item
                    label="标题"
                    prop="title"
                >
                    <el-input
                        v-model="article.title"
                        maxlength="20"
                        :show-word-limit="true"
                    />
                </el-form-item>
            </el-form>
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
                创建
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
import { getResult } from '@/utils/server-wrapper'
import { postJson } from '@/utils/server'
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
                title: '',
                contentType: 'markdown',
                content: '',
                files: []
            },
            titleRules: {
                title: {
                    required: true,
                    trigger: 'blur',
                    validator: (rule, value, callback) => {
                        value = value.trim()
                        if (value === '') {
                            callback(new Error('请输入标题'))
                        } else {
                            callback()
                        }
                    }
                }
            }
        }
    },
    methods: {
        submitArticle () {
            this.$refs.titleForm.validate(async valid => {
                if (valid) {
                    const isArticleValid = this.$refs.editView.check()
                    if (isArticleValid) {
                        console.log('即将创建')
                        this.article = await getResult(postJson('/article/resource', this.article)
                            .then(i => i.json()))
                        eventBus.$emit('showMessage', {
                            showClose: true,
                            type: 'success',
                            message: '创建成功!'
                        })
                        this.$router.push(`/article/${this.article.id}/view`)
                    }
                }
            })
        }
    },
    async beforeRouteEnter (to, from, next) {
        const user = store.getters.user
        if (!user.id) {
            next('/error?code=401')
        } else {
            nprogress.set(0.8)
            next()
        }
    }
}
</script>
