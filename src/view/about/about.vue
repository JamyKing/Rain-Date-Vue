<template>
    <div class="u-f-col">
        <head-guide></head-guide>
        <el-row type="flex" justify="center">
            <el-col :xl="{span: 12}" :lg="{span: 15}" :md="{span: 17}" :sm="{span: 19}" :xs="{span: 22}" class="line-time">
                <el-timeline>
                    <el-timeline-item color="white" timestamp="2018/4/12" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/12 20:46</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item color="white" timestamp="2018/4/3" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/3 20:46</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item color="white" timestamp="2018/4/2" placement="top">
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
}
</script>

<style lang="scss" scoped>
.line-time {
    margin: 30px 0;
}
</style>
