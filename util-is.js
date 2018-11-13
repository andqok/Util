'use strict'

const is = {}

is.array = function (i) {
    return Array.isArray(i)
}

is.object = function (i) {
    return i === Object(i)
        && Object.prototype.toString.call(i) !== '[object Array]'
}

is.string = function (i) {
    return typeof i === 'string'
}

is.number = function (i) {
    return typeof i === 'number'
}

is.numberStr = function (i) {
    /**
     * Check if string can be converted to rational or floating-poing number.
     * @param {string} i
     * @example true: '23423', '12.564'
     */
    return !Number.isNaN(+i)
}

is.ISODate = function (i) {
    /**
     * @param {string} i
     */
    if (is.string(i) && i.length === 10) {
        let /** string */ year = i.slice(0, 4)
        let /** string */ month = i.slice(5, 7)
        let /** string */ day = i.slice(8, 10)
        let /** number */ maxDaysInMonth = time.daysCountInMonth({
            month: month,
            year: year
        })

        if (+month <= 12 && +day <= maxDaysInMonth) {
            return true
        }
    }
    return false
}
