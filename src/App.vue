<template>
  <div id="app">
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
