<template>
    <keep-alive :include="['index', 'about']">
        <router-view></router-view>
    </keep-alive>
</template>

<script>
export default {
    name: 'App',
    created() {
        this.getCategory()
        //在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem("store") ) {
            this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
        }

        //在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener("beforeunload",()=>{
            sessionStorage.setItem("store", JSON.stringify(this.$store.state))
        })
    },
    methods: {
        async getCategory () {
            try {
                const { code, data } = await this.$request('/api/category/list', 'GET')
                if (code === 0) {
                    this.$store.commit('setCategory', data)
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
