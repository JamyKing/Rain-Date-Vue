// import axios from 'axios'
import { def } from '../../conf'

// 上传图片
export function upload (file) {
    const baseUrl = def().baseUrl
    const formData = new FormData()
    formData.append('file', file)
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/api/common/upload',
            method: 'POST',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then((res) => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

// 时间过滤
export function timeFilter (time = +new Date()) {
    const date = new Date(time + 8 * 3600 * 1000) // 增加8小时
    return date.toJSON().substr(0, 19).replace('T', ' ')
}

export function randomNum (minNum, maxNum) {
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1,10)
            break
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10)
            break
        default:
            return 0
            break
    }
}
