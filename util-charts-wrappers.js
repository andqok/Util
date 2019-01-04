const chartWrapper = {}

/**
 * options.stacked (true|false)
 * options.order.level1 ('keyAlphabetic'|'keyNumeric'|
 *                       'valueAscending'|'valueDescending'|<array>)
 * options.order.level2 ('keyAlphabetic'|'keyNumeric'|
 *                       'valueAscending'|'valueDescending'|<array>)
 */

chartWrapper.barChart = function (fn, dataObj, options) {
    let orderLevel1 = orderThings('level1', dataObj)
    return orderLevel1.reduce((result, key) => {
        let obj = dataObj[key] || {}
        if (!options.stacked) {
            result.push([ key, obj ])
        } else {
            let orderLevel2 = orderThings('level2', obj)
            result.push(
                orderLevel2.map(key => {
                    return [key, ( obj[key] | 0 )]
                })  )
        }
        return result
    }, [])

    function orderThings(level, obj) {
        const cases = {
            keyAlphabetic: (keysArr) => {
                return keysArr.sort()
            },
            keyNumeric: (keysArr) => {
                return keysArr.sort((x, y) => {
                    return +x - +y
                })
            },
            valueAscending: (keysArr) => {
                return keysArr.sort((x, y) => {
                    let numX = obj[x]
                    let numY = obj[y]
                    switch (typeof numX) {
                        case 'number':
                            return numX - numY
                        case 'object':
                            return sumValues(numX) - sumValues(numY)
                    }
                })
            },
            valueDescending: (keysArr) => {
                return cases.valueAscending(keysArr).reverse()
            }
        }

        let order = options.order[level]
        if (Array.isArray(order)) {
            return order
        }
        if (Object.keys(cases).includes(order)) {
            return cases[order]( Object.keys(obj) )
        } else {
            throw Error('Bad options.order')
        }
        function sumValues (obj) {
            return Object.keys(obj).reduce((acc, x) => {
                return acc + obj[x]
            }, 0)
        }
    }
}
