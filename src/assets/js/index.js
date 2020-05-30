// 时间过滤
export function timeFilter (time = +new Date()) {
    const date = new Date(time + 8 * 3600 * 1000) // 增加8小时
    return date.toJSON().substr(0, 19).replace('T', ' ')
}
