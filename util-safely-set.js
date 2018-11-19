'use strict'

const safelySet = {}

safelySet.number = function (tree, newBranch, number) {
    if (!tree.hasOwnProperty(newBranch)) {
        tree[newBranch] = number
    } else {
        tree[newBranch] += number
    }
}

safelySet.array = function (tree, newBranch, item) {
    if (!tree.hasOwnProperty(newBranch)) {
        tree[newBranch] = [item]
    } else {
        tree[newBranch].push(item)
    }
}

