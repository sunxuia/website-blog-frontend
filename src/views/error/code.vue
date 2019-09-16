<template>
    <div :class="$style.root">
        <div>
            <h3>遇到了错误🙁</h3>
            <p>{{ code }}</p>
            <p>{{ message }}</p>
            <el-button
                type="text"
                class="el-icon-arrow-left"
                @click="back"
            >
                返回上一页
            </el-button>
        </div>
    </div>
</template>

<style lang="scss" module>
.root {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    text-align: center;
    font-size: 16px;
}
</style>

<script>
export default {
    metaInfo: {
        title: '错误'
    },
    data () {
        return {
            code: ''
        }
    },
    computed: {
        message () {
            if (this.code === '404') {
                return '页面没找到'
            }
            if (this.code === '403') {
                return '没有权限'
            }
            if (this.code === '500') {
                return '内部错误'
            }
            return ''
        }
    },
    mounted () {
        this.code = this.$route.query.code
    },
    methods: {
        back () {
            this.$router.back()
        }
    }
}
</script>
