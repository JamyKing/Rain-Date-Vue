<template>
    <el-row class="foot" type="flex" justify="center">
        <el-col :span="12" class="u-f-col">
            <div class="links u-f-auto">
                <el-link :underline="false" href="https://github.com/iRainy6661">
                    <el-avatar src="../../../static/icon/github.png"></el-avatar>
                </el-link>
            </div>
            <div class="copyright">
                Copyright 2020 Rain All rights Reserved.
                <a rel="nofollow" href="http://www.beian.miit.gov.cn" target="_blank">浙ICP20019063号</a>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'foot'
}
</script>

<style lang="scss" scoped>
.foot {
    width: 100%;
    height: 160px;
    margin: 20px 0 0 0;
    background: #3b3b3b;
}
.links {
    height: 120px;
    margin: 0 auto;
}
.copyright {
    margin: 0 auto;
    color: white;
    font-size: 12px;
    a {
        color: white;
    }
}
</style>
