<template>
    <el-row>
        <el-col class="head" :span="24">
            <el-row class="guide" type="flex" justify="space-between">
                <el-col :span="2">
                    <div class="guide-item u-f-auto">BLOG</div>
                </el-col>
                <el-col class="u-f-jsb" :span="4" :pull="1">
                    <div @click="navTo('index')" class="guide-item u-f-auto">Index</div>
                    <div @click="navTo('about')" class="guide-item u-f-auto">About</div>
                    <div class="guide-item u-f-auto">Login</div>
                </el-col>
            </el-row>
            <el-image class="bg-img" fit="cover" src="../../../static/imgs/bg.jpg"></el-image>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'headGuide',
    data() {
        return {
        }
    },
    created() {
    },
    activated() {
    },
    methods: {
        navTo (url) {
            this.$router.push({ name: url })
        }
    }
}
</script>

<style lang="scss" scoped>
.head {
    height: 500px;
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
