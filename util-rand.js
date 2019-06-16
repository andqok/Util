'use strict'

const rand = {
    arrayElement: {}
}
rand.arrayIndex = function (arr) {
    return Math.floor(Math.random() * arr.length)
}
rand.arrayElement.nonMutating = function (arr) {
    const index = rand.arrayIndex(arr)
    return arr[index]
}
rand.arrayElement.mutating = function randElCut(arr) {
    const index = rand.arrayIndex(arr)
    const out = arr[index]
    arr.splice(index, 1)
    return out
}
rand.objectProperty = function (obj) {
    return rand.arrayEl.nonMutating(Object.keys(obj))
}

rand.shuffleArray = function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var tmp = arr[i]
      arr[i]  = arr[j]
      arr[j]  = tmp
    }
    return arr
}
