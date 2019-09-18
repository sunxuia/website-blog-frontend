export function encode (str) {
    var div = document.createElement('div')
    div.appendChild(document.createTextNode(str))
    return div.innerHTML
}

export function decode (str) {
    var div = document.createElement('div')
    div.innerHTML = str
    return div.innerText || div.textContent
}
