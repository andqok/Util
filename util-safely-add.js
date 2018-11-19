'use strict'

const safelyAdd = {}

safelyAdd.number = function (tree, newBranch, number) {
    if (!tree.hasOwnProperty(newBranch)) {
        tree[newBranch] = number
    } else {
        tree[newBranch] += number
    }
}
