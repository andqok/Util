'use strict'

const rand = {
    arrayEl: {}
}
rand.arrayIndex = function (arr) {
    return Math.floor(Math.random() * arr.length)
}
rand.arrayEl.nonMutating = function (arr) {
  return arr[rand.arrayIndex(arr)]
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

function presetBranch(trunk, branch, value) {
    if (is.emptyVar(trunk[branch])) {
        trunk[branch] = value
    }
}
