<template>
    <div class="u-f-col">
        <head-guide></head-guide>
        <el-row type="flex" justify="center">
            <el-col :xl="{span: 12}" :lg="{span: 15}" :md="{span: 17}" :sm="{span: 19}" :xs="{span: 22}" class="line-time">
                <el-timeline>
                    <el-timeline-item type="success" timestamp="2018/4/12" placement="top">
                        <el-card class="time-info">
                            <div class="info-title u-f">
                                <h3>更新 Github 模板</h3>
                                <el-link class="links" :underline="false" href="https://github.com/iRainy6661">
                                    <i class="iconfont icon-github"></i>
                                </el-link>
                                <el-link class="links" :underline="false" href="https://github.com/iRainy6661">
                                    <i class="iconfont icon-link"></i>
                                </el-link>
                            </div>
                            <div class="info-content">
                                兼容性良好，支持ie8+，及所有现代浏览器。
                                相比于unicode语意明确，书写更直观。可以很容易分辨这个icon是什么。
                                因为使用class来定义图标，所以当要替换图标时，只需要修改class里面的unicode引用。
                                不过因为本质上还是使用的字体，所以多色图标还是不支持的。
                            </div>
                            <div class="info-images">
                                <el-image class="image" fit="contain" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-image>
                            </div>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item type="success" timestamp="2018/4/3" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/3 20:46</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item type="success" timestamp="2018/4/2" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/2 20:46</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
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
            totalPage: 1
        }
    },
    created() {
        // this.getDataList()
    },
    methods: {
        async getDataList () {
            const { pageNo, pageSize } = this
            try {
                const { code, data: { totalPage, listData } } = await this.$request('/api/timeLine/list', 'POST', { pageNo, pageSize })
                if (code === 0) {
                    this.totalPage = totalPage
                    this.timeList = listData
                    console.log(totalPage)
                    console.log(listData)
                }
            } catch (err) {
                console.error(err)
            }
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
        }
    }
}
</style>
