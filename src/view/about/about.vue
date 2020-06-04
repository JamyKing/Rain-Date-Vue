<template>
    <div class="u-f-col">
        <head-guide></head-guide>
        <el-row class="u-f-cer">
            <el-col :xl="{span: 12}" :lg="{span: 15}" :md="{span: 17}" :sm="{span: 19}" :xs="{span: 22}" class="line-time">
                <el-timeline>
                    <el-timeline-item
                        v-for="(item, index) in timeList"
                        :key="index"
                        type="success"
                        :timestamp="item.completeTime"
                        placement="top"
                        class="animated fadeInUp">
                        <el-card class="time-info">
                            <div class="info-title u-f">
                                <h3>{{item.title}}</h3>
                                <el-link v-if="item.github" class="links" :underline="false" :href="item.github">
                                    <i class="iconfont icon-github"></i>
                                </el-link>
                                <el-link v-if="item.link" class="links" :underline="false" :href="item.link">
                                    <i class="iconfont icon-link"></i>
                                </el-link>
                            </div>
                            <div class="info-content">{{item.subtitle}}</div>
                            <div v-if="item.images" class="info-images">
                                <el-image
                                    v-for="(image, indexImg) in item.images"
                                    :key="indexImg"
                                    fit="contain"
                                    :src="image"
                                    @click="preview(item.images)"
                                    :preview-src-list="srcList"
                                    class="image">
                                </el-image>
                            </div>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </el-col>
            <el-col :xl="{span: 6}" :lg="{span: 9}" :md="{span: 12}" :sm="{span: 15}" :xs="{span: 18}">
                <el-card v-show="pageNo < totalPage" @click="loadMore" shadow="hover" class="load-more u-f-auto" :body-style="{padding: '16px'}">加载更多</el-card>
            </el-col>
        </el-row>
        <foot></foot>
    </div>
</template>

<script>
import headGuide from '@/components/common/head-guide'
import foot from '@/components/common/foot'
export default {
    name: 'about',
    components: {
        headGuide,
        foot
    },
    data() {
        return {
            timeList: [],
            pageNo: 1,
            pageSize: 5,
            totalPage: 1,
            srcList: []
        }
    },
    created() {
        this.getDataList()
    },
    methods: {
        async getDataList () {
            const { pageNo, pageSize } = this
            try {
                const { code, data: { totalPage, listData } } = await this.$request('/api/timeLine/list', 'POST', { pageNo, pageSize })
                if (code === 0) {
                    this.totalPage = totalPage
                    this.timeList = [ ...this.timeList, ...listData ]
                }
            } catch (err) {
                console.error(err)
            }
        },
        preview (images) {
            this.srcList = images
        },
        loadMore () {
            this.pageNo += 1
            this.getDataList()
        }
    }
}
</script>

<style lang="scss" scoped>
.line-time {
    margin: 30px 0;
}
.time-info {
    .info-title {
        .links {
            margin: 0 3px;
        }
    }
    .info-content {
        margin: 10px 0;
        font-size: 16px;
    }
    .info-images {
        .image {
            width: 200px;
            height: 200px;
            &:hover {
                cursor: pointer;
            }
        }
    }
}
.load-more {
    &:hover {
        cursor: pointer;
    }
}
</style>
