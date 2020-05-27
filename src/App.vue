<template>
  <div class="u-f-col">
    <head-guide></head-guide>
    <router-view></router-view>
    <foot></foot>
  </div>
</template>

<script>
import headGuide from '@/components/common/head-guide'
import foot from '@/components/common/foot'
export default {
  name: 'App',
  components: {
    headGuide,
    foot
  }
}
</script>

<style lang="scss">
/* 公共样式 */
@import './assets/common.css';
</style>
