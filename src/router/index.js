import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index/index'
import about from '@/view/about/about'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/about',
      name: 'about',
      component: about
    }
  ]
})
