<template>
    <el-row type="flex" justify="center">
        <el-col :span="12">
            <el-image class="bg-img" src="../../../static/imgs/developing.jpg"></el-image>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'about'
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
