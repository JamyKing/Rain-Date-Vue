<template>
  <keep-alive :include="['index', 'about']">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
/* 公共样式 */
@import './assets/common.css';
/* 动画库 */
@import './assets/animate.css';
</style>
