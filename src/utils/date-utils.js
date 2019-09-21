export function format (date, fmt) {
    var keys = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'h+': date.getHours() % 12 > 12 ? date.getHours() % 12 : date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        S: date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) { // year
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in keys) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (keys[k]) : (('00' + keys[k]).substr(('' + keys[k]).length)))
        }
    }
    return fmt
}

export function getDate (date) {
    const res = new Date(date)
    res.setHours(0)
    res.setMinutes(0)
    res.setSeconds(0)
    res.setMilliseconds(0)
    return res
}

export function getRelativeDate (time) {
    if (!(time instanceof Date)) {
        time = new Date(time)
    }
    const dayCount = 24 * 60 * 60 * 1000
    const now = new Date()
    const interval = now.getTime() - time.getTime()
    if (interval < 60 * 60 * 1000) {
        return Math.ceil(interval / dayCount, 1) + '天后'
    }
    if (interval <= 0) {
        return '即将'
    }
    if (interval < 1 * 60 * 1000) {
        return '刚刚'
    }
    if (now - getDate(time).getTime() < 24 * 60 * 60 * 1000) {
        return format(time, 'HH:mm')
    }
    if (now.getFullYear() === time.getFullYear()) {
        return format(time, 'MM:dd')
    }
    return format(time, 'yyyy-MM-dd')
}
