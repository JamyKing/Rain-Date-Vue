import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'index'
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/view/index/index'], resolve)
    },
    {
      path: '/detail',
      name: 'detail',
      component: resolve => require(['@/view/index/detail'], resolve)
    },
    {
      path: '/about',
      name: 'about',
      component: resolve => require(['@/view/about/about'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/view/public/login'], resolve)
    },
    {
      path: '/admin',
      name: 'admin',
      component: resolve => require(['@/view/public/admin'], resolve)
    },
    {
      path: '/creation',
      name: 'creation',
      component: resolve => require(['@/view/public/creation'], resolve)
    }
  ]
})
