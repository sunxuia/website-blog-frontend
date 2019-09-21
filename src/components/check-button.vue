<template>
    <el-popover
        v-model="visible"
        placement="top"
        width="160"
    >
        <p>{{ text }}</p>
        <div style="text-align: right; margin: 0;">
            <el-button
                size="mini"
                @click="visible = false"
            >
                取消
            </el-button>
            <el-button
                :type="type"
                size="mini"
                @click="action"
            >
                确定
            </el-button>
        </div>
        <slot slot="reference" />
    </el-popover>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'primary'
        },
        text: {
            type: String,
            default: '您确定吗?😯'
        }
    },
    data () {
        return {
            visible: false
        }
    },
    methods: {
        action () {
            this.$emit('click')
            this.visible = false
        }
    }
}
</script>
