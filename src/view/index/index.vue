<template>
    <div class="u-f-col">
        <head-guide></head-guide>
        <el-row :gutter="30" type="flex" justify="center" style="margin: 0">
            <el-col :span="8">
                <div class="data-list">
                    <div v-for="(item, index) in dataList" :key="index" @click="getDetail(item.id)" class="list-item">
                        <h2 class="title">{{item.title}}</h2>
                        <h3 class="sub-title">Why I dislike CSS as a programming language</h3>
                        <div class="content">{{item.subtitle}}</div>
                        <p class="meta">
                            Posted by Hux on October 6, 2017
                        </p>
                        <div class="hr"></div>
                    </div>

                </div>
            </el-col>
            <el-col class="user u-f-rc" :span="4">
                <el-image class="head" src="../../../static/imgs/head.jpg"></el-image>
            </el-col>
        </el-row>
        <foot></foot>
    </div>
</template>

<script>
// import { mapState } from 'vuex'
import headGuide from '@/components/common/head-guide'
import foot from '@/components/common/foot'
export default {
    name: 'index',
    components: {
        headGuide,
        foot
    },
    data() {
        return {
            dataList: []
        }
    },
    created() {
        this.getDataList()
    },
    activated() {
        // console.log(this.hasLogin)
    },
    computed: {
        // ...mapState(['hasLogin'])
    },
    watch: {
    },
    methods: {
        async getDataList () {
            try {
                const { code, data } = await this.$request('/api/blog/indexList', 'GET')
                if (code === 0) {
                    this.dataList = data
                }
            } catch (err) {
                console.error(err)
            }
        },
        getDetail (id) {
            this.$router.push({ name: 'detail', query: {id: id} })
        }
    }
}
</script>

<style lang="scss" scoped>
.user {
    .head {
        width: 200px;
        height: 200px;
        padding: 5px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin: 10px auto;
    }
}
.data-list {
    min-height: 600px;
    .list-item {
        &:hover {
            cursor: pointer;
        }
        .title {
            font-size: 26px;
            line-height: 1.3;
            margin: 30px 0 10px;
        }
        .sub-title {
            font-size: 16px;
            line-height: 1.3;
            font-weight: 300;
            margin-bottom: 10px;
        }
        .content {
            font-size: 14px;
            font-style: italic;
            color: #a3a3a3;
        }
        .meta {
            font-family: Lora,'Times New Roman',serif;
            font-size: 18px;
            font-style: italic;
            margin-bottom: 30px;
        }
        .hr {
            height: 0;
            margin: 20px 0;
            border: 0;
            border-top: 1px solid #eeeeee;
        }
    }
}
</style>
