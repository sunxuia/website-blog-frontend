export function encode (str) {
    return str.replace(/([[\].|^\-\\*?+{}$])/g, '\\$1')
}
