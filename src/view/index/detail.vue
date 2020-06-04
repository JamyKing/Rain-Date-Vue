<template>
    <div class="u-f-col">
        <head-guide guideHeight="60px" :imgShow="false"></head-guide>
        <el-row type="flex" justify="center">
            <el-col :xl="{span: 16}" :lg="{span: 18}" :md="{span: 20}" :sm="{span: 22}" :xs="{span: 24}">
                <el-card>
                    <h1 class="title">{{blogDetail.title}}</h1>
                    <div class="time">{{blogDetail.createTime}}</div>
                    <div v-html="blogDetail.htmlRender" class="markdown-body" style="min-height: 600px;"></div>
                </el-card>
            </el-col>
        </el-row>
        <foot></foot>
        <scroll-top></scroll-top>
    </div>
</template>

<script>
import headGuide from '@/components/common/head-guide'
import foot from '@/components/common/foot'
import scrollTop from '@/components/common/scrollTop'
export default {
    name: 'detail',
    components: {
        headGuide,
        foot,
        scrollTop
    },
    data() {
        return {
            id: null,
            blogDetail: {}
        }
    },
    created() {
        this.id = this.$route.query.id
        this.loadDetail(this.id)
    },
    methods: {
        async loadDetail (id) {
            try {
                const { code, data } = await this.$request('/api/blog/detail', 'GET', { id })
                if (code === 0) {
                    this.blogDetail = data
                }
            } catch (err) {
                console.error(err)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    margin-bottom: 10px;
}
.time {
    margin: 5px 10px 20px;
}
.up-top {
    height: 50px;
    width: 50px;
    background-color: #DCDFE6;
    box-shadow: 0 0 6px rgba(0,0,0, .12);
    text-align: center;
    line-height: 40px;
    color: #1989fa;
}
</style>
