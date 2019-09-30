<template>
    <div>
        <b>管理</b>
        <div class="split-line" />
        <div>
            <el-button
                class="el-icon-edit"
                @click="editArticle"
            >
                修改
            </el-button>
            <check-button
                type="danger"
                text="确定删除吗?😳 不能撤销的哦!😲"
                @click="deleteArticle"
            >
                <el-button
                    type="danger"
                    class="el-icon-delete"
                >
                    删除
                </el-button>
            </check-button>
        </div>
    </div>
</template>

<script>
import CheckButton from '@/components/check-button'
import { deleteData } from '@/utils/server'
import { getResult } from '@/utils/server-wrapper'
import eventBus from '@/utils/event-bus'

export default {
    components: {
        CheckButton
    },
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    methods: {
        editArticle () {
            this.$router.push(`/article/${this.article.id}/edit`)
        },
        async deleteArticle () {
            await getResult(deleteData(`/article/${this.article.id}/resource`))
                .then(() => {
                    eventBus.$emit('showMessage', {
                        showClose: true,
                        type: 'success',
                        message: '删除成功'
                    })
                })
            this.$router.back()
        }
    }
}
</script>
