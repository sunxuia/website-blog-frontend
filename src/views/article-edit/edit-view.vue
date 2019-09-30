<template>
    <el-row :gutter="10">
        <el-col :span="12">
            <el-form
                ref="form"
                :model="article"
                :rules="formRules"
                enctype="multipart/form-data"
                label-position="top"
                :class="$style.card"
            >
                <el-form-item
                    label="格式"
                    prop="contentType"
                >
                    <el-select
                        v-model="article.contentType"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in contentTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="内容"
                    prop="content"
                >
                    <el-input
                        ref="input"
                        v-model="article.content"
                        type="textarea"
                        :rows="20"
                        @paste.native="onPaste"
                        @drop.native="onDrop"
                    />
                </el-form-item>
                <span
                    v-show="article.contentType === 'markdown'"
                    style="font-size: 14px; color: green"
                >Markdown 可以粘贴/拖动图片到文本框中</span>
            </el-form>
        </el-col>
        <el-col :span="12">
            <div :class="$style.card">
                <h4 style="margin-top: 0">
                    <b>内容</b>
                </h4>
                <div class="split-line" />
                <!-- eslint-disable next-line vue/no-v-html -->
                <p
                    class="html-content"
                    v-html="contentHtml"
                />
            </div>
        </el-col>
    </el-row>
</template>

<style lang="scss" module>
.card {
    background: white;
    padding: 15px;
    box-shadow: 2px 2px 3px lightgray;
    min-width: 480px;
    margin-bottom: 10px;
}
</style>

<script>
import { Remarkable } from 'remarkable'
import { encode as htmlEncode } from '@/utils/html-code'
import eventBus from '@/utils/event-bus'
import { postData } from '@/utils/server'
import { getResult } from '@/utils/server-wrapper'

export default {
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            contentTypes: [{
                label: '文本',
                value: 'text'
            }, {
                label: 'Markdown',
                value: 'markdown'
            }],
            formRules: {
                contentType: {
                    required: true,
                    message: '这个没填😓'
                },
                content: {
                    required: true,
                    trigger: 'blur',
                    validator: (rule, value, callback) => {
                        value = value.trim()
                        if (value === '') {
                            callback(new Error('请输入内容'))
                        } else if (value.length < 20) {
                            callback(new Error('请输入不少于20字'))
                        } else if (value.length > 10000) {
                            callback(new Error('请勿输入一万字以上'))
                        } else {
                            callback()
                        }
                    }
                }
            }
        }
    },
    computed: {
        contentHtml () {
            const content = this.article.content
            if (!content) {
                return '(无内容)'
            }
            const type = this.article.contentType
            if (type === 'markdown') {
                var md = new Remarkable()
                return md.render(content)
            }
            return htmlEncode(content)
        }
    },
    methods: {
        check () {
            let isValid = true
            this.$refs.form.validate(valid => {
                isValid = valid
            })
            return isValid
        },
        onPaste (e) {
            if (!(e.clipboardData && e.clipboardData.items)) {
                return
            }
            for (const item of e.clipboardData.items) {
                if (item.kind === 'file') {
                    if (this.article.contentType !== 'markdown') {
                        eventBus.$emit('showMessage', {
                            showClose: true,
                            type: 'error',
                            message: '此格式不支持图片粘贴'
                        })
                    } else {
                        this.uploadFile(item.getAsFile())
                        break
                    }
                }
            }
        },
        onDrop (e) {
            const files = e.dataTransfer.files
            for (const file of files) {
                this.uploadFile(file)
            }
            e.preventDefault()
        },
        async uploadFile (file) {
            const formData = new FormData()
            formData.append('file', file)
            eventBus.$emit('showMessage', {
                showClose: true,
                type: 'info',
                message: '文件上传中'
            })
            const fileId = await getResult(postData({
                path: process.env.VARIABLES.FILE_PATH_PREFIX + '/file/upload',
                absolute: true
            }, {
                body: formData
            }).then(i => i.text()))
            eventBus.$emit('showMessage', {
                showClose: true,
                type: 'success',
                message: '文件上传成功'
            })
            this.article.files.push(fileId)
            this.insertAtCursor(this.$refs.input.$el.children[0],
                `![${file.name}](${process.env.VARIABLES.FILE_PATH_PREFIX}/file/${fileId})`)
        },
        insertAtCursor (myField, myValue) {
            if (document.selection) {
                // IE
                myField.focus()
                const sel = document.selection.createRange()
                sel.text = myValue
            } else if (myField.selectionStart || myField.selectionStart === '0') {
                // others
                const startPos = myField.selectionStart
                const endPos = myField.selectionEnd
                myField.value = myField.value.substring(0, startPos) +
                    myValue +
                    myField.value.substring(endPos, myField.value.length)
            } else {
                // not supported
                myField.value += myValue
            }
        }
    }
}
</script>
