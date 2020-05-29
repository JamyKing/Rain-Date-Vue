import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index/index'
import detail from '@/view/index/detail'
import about from '@/view/about/about'
import login from '@/view/public/login'
import admin from '@/view/public/admin'
import creation from '@/view/public/creation'

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
      component: index
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/creation',
      name: 'creation',
      component: creation
    }
  ]
})
