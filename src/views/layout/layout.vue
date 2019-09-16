<template>
    <el-container>
        <el-header style="background-color: #007acc">
            <el-row
                type="flex"
                justify="center"
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
    </el-container>
</template>

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
