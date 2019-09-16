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
