<template>
    <div class="u-f-col">
        <head-guide></head-guide>
        <el-row type="flex" justify="center">
            <el-col :span="12">
                <el-image class="bg-img" src="../../../static/imgs/suolong.png"></el-image>
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
.bg-img {
    width: 100%;
    height: 100%;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
}
</style>
