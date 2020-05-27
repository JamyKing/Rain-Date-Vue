import Vue from 'vue'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$store = store
// Vue.prototype.$api = {
//   msg,
//   prePage,
//   request,
//   uploadImg,
//   logout,
//   isVip,
//   setUserInfo
// }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
