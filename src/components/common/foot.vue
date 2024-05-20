<template>
  <el-row class="foot" type="flex" justify="center">
    <el-col :span="12" class="u-f-col">
      <div class="links u-f-auto">
        <el-link class="link-item" :underline="false" href="https://github.com/JamyKing">
          <i class="iconfont icon-github" style="font-size: 30px;"></i>
        </el-link>
        <el-link class="link-item" :underline="false" href="http://demo.jianking.vip">
          <i class="iconfont icon-demo" style="font-size: 30px;"></i>
        </el-link>
        <el-link class="link-item" :underline="false" href="https://ext.dcloud.net.cn/publisher?id=187555">
          <i class="iconfont icon-uniapp" style="font-size: 30px;"></i>
        </el-link>
        <!-- <el-link class="link-item" :underline="false" href="https://www.jianshu.com/u/82889182f257">
            <i class="iconfont icon-jianshu" style="font-size: 30px;"></i>
        </el-link> -->
      </div>
      <div class="copyright">
        Copyright © {{year}} JamyKing All rights Reserved.
        <a rel="nofollow" href="https://beian.miit.gov.cn" target="_blank">浙ICP备20019063号-1</a>
      </div>
      <div class="record u-f-auto">
        <el-image class="record-image" src="../../../static/imgs/record.png"></el-image>
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010802010934">浙公网安备
          33010802010934号</a>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'foot',
  computed: {
    year() {
      return new Date().getFullYear()
    }
  }
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
  height: 110px;
  margin: 0 auto;

  .link-item {
    margin: 0 5px;
  }
}

.copyright, .record {
  margin: 0 auto;
  color: white;
  font-size: 12px;

  a {
    color: white;
  }
}
</style>
