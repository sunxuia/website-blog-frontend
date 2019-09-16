<template>
    <el-container>
        <el-header :class="$style.header">
            <el-row
                type="flex"
                justify="center"
                style="position: relative"
            >
                <el-col
                    :md="24"
                    :lg="20"
                    style="max-width: 1000px;"
                >
                    <header-content />
                </el-col>
            </el-row>
        </el-header>
        <el-main style="margin-top: 50px">
            <el-row
                type="flex"
                justify="center"
            >
                <el-col
                    :md="24"
                    :lg="20"
                    style="max-width: 1000px;"
                >
                    <transition
                        name="fade"
                        mode="out-in"
                    >
                        <router-view />
                    </transition>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<style lang="scss" module>
.header {
    background-color: #007acc;
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 1;
    opacity: 0.95;
}
</style>

<script>
import HeaderContent from './header-content'

export default {
    metaInfo: {
        title: 'example'
    },
    components: {
        HeaderContent
    }
}
</script>
