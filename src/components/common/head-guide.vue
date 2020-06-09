<template>
    <el-row>
        <el-col class="head" :style="[{height: guideHeight}]" :span="24">
            <el-row class="guide" type="flex" justify="space-between">
                <el-col :xl="{span: 2}" :lg="{span: 3}" :md="{span: 4}" :sm="{span: 5}" :xs="{span: 6}">
                    <div class="guide-item u-f-auto">RainDate</div>
                </el-col>
                <el-col class="u-f-jsb" :xl="{span: 5, pull: 1}" :lg="{span: 9}" :md="{span: 12}" :sm="{span: 15}" :xs="{span: 18}">
                    <div @click="navTo('index')" class="guide-item u-f-auto">Index</div>
                    <div @click="navTo('about')" class="guide-item u-f-auto">About</div>
                    <div v-if="hasLogin" @click="navTo('admin')" class="guide-item u-f-auto">Admin</div>
                    <div v-if="hasLogin" class="guide-item u-f-auto">
                        <el-avatar src="../../../static/imgs/head.jpg"></el-avatar>
                    </div>
                    <div v-if="!hasLogin" @click="navTo('login')" class="guide-item u-f-auto">Login</div>
                </el-col>
            </el-row>
            <el-image v-if="imgShow" class="bg-img" fit="cover" lazy :src="bgImg"></el-image>
            <div v-if="sayingShow" class="saying u-f-auto animated flipInX">
                <h1 v-html="feature"></h1>
            </div>
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
        },
        imgShow: {
            type: Boolean,
            default: true
        },
        sayingShow: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            extract: '',
            feature: ''
        }
    },
    created() {
        this.getAim()
    },
    computed: {
        ...mapState(['hasLogin'])
    },
    methods: {
        navTo (url) {
            this.$router.push({ name: url })
        },
        async getAim () {
            if (this.imgShow && this.sayingShow) {
                try {
                    const { code, data } = await this.$request('/api/common/getAim', 'GET')
                    if (code === 0) {
                        this.extract = data.extract
                        this.feature = data.feature
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.head {
    position: relative;
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
    .saying {
        width: 100%;
        position: absolute;
        bottom: 30%;
        h1 {
            font-size: 36px;
            max-width: 500px;
            color: white;
            text-align: center;
            font-family: cursive;
        }
    }
}
</style>
