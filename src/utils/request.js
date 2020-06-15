// import axios from 'axios'
import router from '@/router'
import store from '@/store'
import { def } from '../conf'

const http = axios.create({
    timeout: 1000 * 30,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

/**
 * 请求拦截
 */
// http.interceptors.request.use(conf => {
//     conf.headers['token'] = Vue.cookie.get('token') // 请求头带上token
//     return conf
// }, error => {
//     return Promise.reject(error)
// })

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
    if (response.data && response.data.code === 401) { // 401, 未登录
        store.commit('logout')
        router.push({name: 'login'})
    }
    return response
}, error => {
    return Promise.reject(error)
})

const baseUrl = def().baseUrl

const request = (url, method, data = {}) => {
    return new Promise((resolve, reject) => {
        http({
            url: baseUrl + url,
            method: method,
            [method === 'GET' ? 'params' : 'data']: data
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export default request
