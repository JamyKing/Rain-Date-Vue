<template>
    <el-row>
        <el-col :span="24">
            <el-image class="bg-img" fit="cover" src="../../../static/imgs/bg.jpg"></el-image>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: "headGuide"
}
</script>

<style lang="scss" scoped>
    .bg-img{
        width: 100%;
        height: 500px;
    }
</style>
