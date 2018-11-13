'use strict'

const time = {}

time.datesBetween = function (date1, date2) {
    /**
     * @param {Date} date1
     * @param {Date} date2
     * @return {Array<Date>} all dates between date1 and date2,
     * including both of them
     */
    date1 = time.needDate(date1)
    date2 = time.needDate(date2)
    if (this.ISOfyDate(date1) === this.ISOfyDate(date2)) {
        return [date2]
    }
    if (date1 < date2) {
        return [date1].concat(
            this.datesBetween(new Date(this.nextDate(date1)), date2)
        )
    }
    if (date1 < date2) {
        return this.datesBetween(date2, date1)
    }
}

time.ISOfyDate = function (date) {
    /**
     * @param {string|Date} date
     * @return {string}
     */
    if (date instanceof Date) {
        return date.toISOString().slice(0, 10)
    } else if (is.string(date) && is.ISODate(date)) {
        return date
    } else {
        throw Error
    }
}

time.getAllYearDays = function (year) {
    /** 
     * @param  {string|number} year
     * @return {Array<Date>}
     */
    return this.datesBetween(new Date(`${year}-01-01`),
        new Date(`${year}-12-31`))
}

time.daysInFebruary = function (year) {
    /**
     * @param {string|number} year
     */
    year = parseInt(year)
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
        return 29
    } else {
        return 28
    }
}

time.daysCountInMonth = function (i) {
    /** 
     * Show number of days in specific month.
     * Leap years complicate things: year property is obligatory
     * @param {object} i
     * @return {number}
     */
    if (!is.object(i)) {
        throw Error
    }
    let monthsLength = {
        '01': 31, '02': this.daysInFebruary(i.year),
        '03': 31, '04': 30,
        '05': 31, '06': 30,
        '07': 31, '08': 31,
        '09': 30, '10': 31,
        '11': 30, '12': 31
    }
    return monthsLength[i.month]
}

time.nextDate = (date_s) => {
    /**
     * @param  {string} date_s formatted as ISO 8601 date: @example '2011-10-31'
     * @return {string} identically formatted
     */
    let /** {Date} */ date = new Date(date_s)
    date.setDate(date.getDate() + 1)
    let /** number */ year = date.getFullYear()
    let /** string */ month = String(date.getMonth() + 1).padStart(2, '0')
    let /** string */ day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

time.needISO = function (date) {
    if (date instanceof Date) {
        return time.ISOfyDate(date)
    }
    if (is.ISODate(date)) {
        return date
    }
}

time.needDate = function (date) {
    if (is.ISODate(date)) {
        return new Date(date)
    }
    if (date instanceof Date) {
        return date
    }
}
