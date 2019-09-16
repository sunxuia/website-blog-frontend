<template>
    <div>
        <el-input
            ref="input"
            v-model="text"
            placeholder="输入搜索内容"
            postfix-icon="el-icon-search"
            :class="$style.blur"
            clearable
            @mouseenter.native="onFocus"
            @mouseleave.native="onBlur"
            @focus="onFocus"
            @blur="onBlur"
        >
            <el-button
                slot="append"
                icon="el-icon-search"
                @click="search"
            />
        </el-input>
    </div>
</template>

<style lang="scss" module>
.focus {
    opacity: 1;
}
.blur {
    opacity: 0.8;
}
</style>

<script>
export default {
    data () {
        return {
            text: '',
            foucused: false
        }
    },
    methods: {
        onFocus () {
            if (!this.foucused) {
                const classList = this.$refs.input.$el.classList
                classList.remove(this.$style.blur)
                classList.add(this.$style.focus)
            }
        },
        onBlur () {
            if (this.foucused) {
                const classList = this.$refs.input.$el.classList
                classList.remove(this.$style.focus)
                classList.add(this.$style.blur)
            }
        },
        search () {
            this.$router.push({
                path: '/search',
                query: {
                    path: this.text.trim()
                }
            })
        }
    }
}
</script>
