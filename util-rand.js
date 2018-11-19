'use strict'

const rand = {
    arrayEl: {}
}
rand.arrayIndex = function (arr) {
    return Math.floor(Math.random() * arr.length)
}
rand.arrayEl.nonMutating = function (arr) {
    const index = rand.arrayIndex(arr)
    return arr[index]
}
rand.arrayEl.mutating = function randElCut(arr) {
    const index = rand.arrayIndex(arr)
    const out = arr[index]
    arr.splice(index, 1)
    return out
}
rand.objectProperty = function (obj) {
    return rand.arrayEl.nonMutating(Object.keys(obj))
}
