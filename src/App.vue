<template>
  <keep-alive :include="['index', 'about', 'admin']">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.getCategory()
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  },
  methods: {
    async getCategory() {
      try {
        if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
          this.$store.commit('setMobile', true)
        }
        const cateRes = await this.$request('/api/category/list', 'GET')
        if (cateRes.code === 0) {
          this.$store.commit('setCategory', cateRes.data)
        }
        // 登录状态校验
        const loginRes = await this.$request('/api/user/loginVerify', 'GET')
        if (loginRes.code === 0 && loginRes.data) {
          this.$store.commit('login', 'jjk6661')
        } else {
          this.$store.commit('logout')
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style lang="scss">
/* 公共样式 */
@import './assets/css/common.css';
/* 动画库 */
@import './assets/css/animate.css';
</style>
