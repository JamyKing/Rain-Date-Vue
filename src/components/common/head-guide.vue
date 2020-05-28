<template>
    <el-row>
        <el-col class="head" :style="[{height: guideHeight}]" :span="24">
            <el-row class="guide" type="flex" justify="space-between">
                <el-col :span="2">
                    <div @click="test" class="guide-item u-f-auto">BLOG</div>
                </el-col>
                <el-col class="u-f-jsb" :span="4" :pull="1">
                    <div @click="navTo('index')" class="guide-item u-f-auto">Index</div>
                    <div @click="navTo('about')" class="guide-item u-f-auto">About</div>
                    <div v-if="hasLogin" class="guide-item u-f-auto">
                        <el-avatar src="../../../static/imgs/head.jpg"></el-avatar>
                    </div>
                    <div v-else @click="navTo('login')" class="guide-item u-f-auto">Login</div>
                </el-col>
            </el-row>
            <el-image class="bg-img" fit="cover" :src="bgImg"></el-image>
        </el-col>
    </el-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'headGuide',
    props: {
        bgImg: {
            type: String,
            default: '../../../static/imgs/yeying.png'
        },
        guideHeight: {
            type: String,
            default: '500px'
        }
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState(['hasLogin'])
    },
    methods: {
        navTo (url) {
            this.$router.push({ name: url })
        },
        async test () {
            try {
                const { code, data } = await this.$request('/api/blog/list', 'GET')
                if (code === 0) {
                    console.log(data)
                }
            } catch (err) {
                console.error(err)
            } finally {
                console.log('finally')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.head {
    /*height: 500px;*/
    margin-bottom: 20px;
    .guide {
        position: sticky;
        top: 0;
        z-index: 10;
        background: #cfcfcf;
        opacity: 0.7;
        .guide-item {
            width: 120px;
            height: 60px;
            font-size: 22px;
            color: #000000;
            &:hover {
                cursor: pointer;
                color: #414141;
            }
        }
    }
    .bg-img {
        margin-top: -60px;
        width: 100%;
        height: 100%;
    }
}
</style>
