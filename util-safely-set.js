'use strict'

const safelySet = {
    multiple: {}
}

safelySet.number = function (tree, newBranch, number) {
    if (!tree.hasOwnProperty(newBranch)) {
        tree[newBranch] = number
    } else {
        /** not always it should be toFixed... */
        let newNumber = +((tree[newBranch] + number).toFixed(1))
        tree[newBranch] = newNumber
    }
}

safelySet.array = function (tree, newBranch, item) {
    if (!tree.hasOwnProperty(newBranch)) {
        tree[newBranch] = [item]
    } else {
        tree[newBranch].push(item)
    }
}

safelySet.object = (tree, ...newBranches) => {
    if (typeof tree === 'undefined') {
        throw new Error('Tree cannot be undefined')
    }
    innerSelf(tree, newBranches)
    function innerSelf(tree, newBranches) {
        let branch = newBranches.shift()
        if (branch) {
            if (!tree[branch]) {
                tree[branch] = {}
            }
            innerSelf(tree[branch], newBranches)
        }
        else {
            return true
        }
    }
}

safelySet.multipleThings = function (what) {
    return function(...args) {
        for (let arg of args) {
            safelySet[what](...arg)
        }
    }
}

safelySet.multiple.objects = safelySet.multipleThings('object')
safelySet.multiple.numbers = safelySet.multipleThings('number')
safelySet.multiple.arrays  = safelySet.multipleThings('array')
