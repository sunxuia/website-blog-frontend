<template>
    <div>
        <div
            v-if="isLoggedIn"
            class="children-justify"
            style="align-items: flex-start"
        >
            <el-avatar
                :size="80"
                fit="fill"
                :src="user.avatarUrl"
            />
            <div style="flex-grow: 1; text-align: right;">
                <el-input
                    v-model="conent"
                    type="textarea"
                    rows="2"
                    minlength="6"
                    maxlength="50"
                    placeholder="说点什么"
                    show-word-limit
                    @focus="onFocus"
                />
                <div class="children-justify">
                    <span :class="messageStyle">{{ message }}</span>
                    <el-button
                        type="text"
                        style="padding-bottom: 0; padding-top: 8px;"
                        @click="sendComment"
                    >
                        发送
                    </el-button>
                </div>
            </div>
        </div>
        <div
            v-else
            style="text-align: center; margin-top: 10px;"
        >
            <a
                style="color: #CEC7CE; font-size: 20px; text-decoration: none"
                :href="loginUrl"
            >登录发表评论</a>
        </div>
    </div>
</template>

<style lang="scss" module>
.error {
    color: red;
    font-size: 14px;
}

.success {
    color: green;
    font-size: 14px;
}
</style>

<script>
import { postJson } from '@/utils/server'
import { getResult } from '@/utils/server-wrapper'

export default {
    props: {
        articleId: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            conent: '',
            conentType: 'text',
            messageStyle: '',
            message: '',
            loginUrl: process.env.VARIABLES.GATEWAY_PATH_PREFIX +
                '/login/redirect?redirect=' +
                encodeURIComponent(document.location)
        }
    },
    computed: {
        isLoggedIn () {
            return !!this.$store.getters.user.id
        },
        user () {
            return this.$store.getters.user
        }
    },
    methods: {
        onFocus () {
            this.message = ''
        },
        async sendComment () {
            if (this.conent.length < 10) {
                this.messageStyle = this.$style.error
                this.message = '请输入至少10 个字'
            } else {
                const comment = await getResult(postJson(`/article/${this.articleId}/comment`, {
                    content: this.conent,
                    conentType: this.conentType
                }).then(i => i.json()))

                this.conent = ''
                this.messageStyle = this.$style.success
                this.message = '发送成功🚀'
                this.$emit('addComment', comment)
            }
        }
    }
}
</script>
