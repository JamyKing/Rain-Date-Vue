<template>
    <div class="u-f-col">
        <head-guide guideHeight="60px" :imgShow="false"></head-guide>
        <el-row type="flex" justify="center">
            <el-col :span="10">
                <h1 class="title">{{blogDetail.title}}</h1>
                <div v-html="blogDetail.htmlRender" class="markdown-body" style="min-height: 600px;"></div>
            </el-col>
        </el-row>
        <foot></foot>
    </div>
</template>

<script>
import headGuide from '@/components/common/head-guide'
import foot from '@/components/common/foot'
export default {
    name: 'detail',
    components: {
        headGuide,
        foot
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
                const { code, data } = await this.$request('/api/blog/detail', 'GET', { id: id })
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
    margin-bottom: 30px;
}
</style>
