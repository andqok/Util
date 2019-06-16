function safelySetNumber (tree, ...branches) {
  const num = branches.pop()

  return innerSelf(tree, ...branches)

  function innerSelf(tree, ...branches) {
    const branch = branches.shift()
    if (branch) {
      const currentValue = tree[branch]
      , isObj = Object(currentValue) === currentValue
      , isNum = typeof currentValue === 'number'
      , isUndef = typeof currentValue === 'undefined'
      if (isObj) tree[branch] = innerSelf(tree[branch], ...branches)
      if (isNum) tree[branch] = currentValue + num
      if (isUndef) tree[branch] = innerSelf({}, ...branches)
      return tree
    } else {
      return num
    }
  }
}

function safelySetArray (tree, ...newBranches) {
  const value = newBranches.pop()
  , isObj = Object(tree) !== tree
  , isUndef = typeof tree == 'undefined'
  , isValidFunc = el => typeof el === 'string' || Number.isFinite(el)
  , isEachValid = newBranches.every(isValidFunc)
  if (isObj) { throw new Error('Tree is not an object.') }
  if (isUndef) { throw new Error('Tree cannot be undefined or null.') }
  if (!isEachValid) {
    throw new Error('Not all branches are valid object properties.')
  }
  return innerSelf(tree, newBranches)

  function innerSelf(tree, newBranches) {
    const branch = newBranches.shift()
    if (branch) {
      if (!tree[branch]) tree[branch] = {}
      if (Array.isArray(tree[branch])) { 
        tree[branch].push(value)
        return tree
      }
      tree[branch] = innerSelf(tree[branch], newBranches)
      return tree
    } else {
      return [value]
    }
  }
}

function safelySetArrayUnique (tree, ...newBranches) {
  const value = newBranches.pop()
  , isObj = Object(tree) !== tree
  , isUndef = typeof tree == 'undefined'
  , isValidFunc = el => typeof el === 'string' || Number.isFinite(el)
  , isEachValid = newBranches.every(isValidFunc)
  if (isObj) { throw new Error('Tree is not an object.') }
  if (isUndef) { throw new Error('Tree cannot be undefined or null.') }
  if (!isEachValid) {
    throw new Error('Not all branches are valid object properties.')
  }
  return innerSelf(tree, newBranches)

  function innerSelf(tree, newBranches) {
    const branch = newBranches.shift()
    if (branch) {
      if (!tree[branch]) tree[branch] = {}
      if (Array.isArray(tree[branch])) { 
        if (!tree[branch].includes(value)) tree[branch].push(value)
        return tree
      }
      tree[branch] = innerSelf(tree[branch], newBranches)
      return tree
    } else {
      return [value]
    }
  }
}

function safelySetObject (tree, ...newBranches) {
  if (typeof tree == 'undefined') {
    throw new Error('Tree cannot be undefined or null.')
  }
  if (Object(tree) !== tree) {
    throw new Error('Tree is not an object.')
  }
  const isEachValid = newBranches.every(el => {
    return typeof el === 'string' || Number.isFinite(el)
  })
  if (!isEachValid) {
    throw new Error('Not all branches are valid object properties.')
  }
  innerSelf(tree, newBranches)
  return tree

  function innerSelf(tree, newBranches) {
    const branch = newBranches.shift()
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
