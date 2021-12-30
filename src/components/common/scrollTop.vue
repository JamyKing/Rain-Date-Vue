<template>
  <el-backtop class="up-top" target="" :bottom="50" :right="50"></el-backtop>
</template>

<script>
export default {
  name: 'scrollTop',
  props: {
    autoTop: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  mounted() {
    if (this.autoTop) {
      window.scrollTo(0, 0)
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.to-top {
  height: 50px;
  width: 50px;
  background-color: #DCDFE6;
  box-shadow: 0 0 6px rgba(0, 0, 0, .12);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
}
</style>
