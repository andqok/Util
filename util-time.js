'use strict'

const time = {}

time.monthList = [
    '01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11', '12'
]

time.monthsNamesShort = {
    '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
    '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
    '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
}

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

time.countDaysBetween = function (date1, date2) {
    let inMilliseconds = Math.abs(
        time.needDate(date2) - time.needDate(date1)
    )
    return Math.round( inMilliseconds / 86400000 )
}

time.ISOfyDate = function (date) {
    /**
     * @param {string|Date} date
     * @return {string}
     */
    if (date instanceof Date) {
        return date.toISOString().slice(0, 10)
    } else if (typeof date == 'string' && time.isISODate(date)) {
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

time.getAllYearDates = time.getAllYearDays

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
    if (!(i == Object(i))) {
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

time.isISODate = function (i) {
    /**
     * @param {string} i
     */
    if (typeof i == 'string' && i.length === 10) {
        const {year, month, day} = time.destructISO(i)
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

time.needISO = function (date) {
    if (date instanceof Date) {
        return time.ISOfyDate(date)
    }
    if (time.isISODate(date)) {
        return date
    }
}

time.needDate = function (date) {
    if (time.isISODate(date)) {
        return new Date(date)
    }
    if (date instanceof Date) {
        return date
    }
}

time.destructISO = function (date) {
    //  in: date string like "2018-04-17"
    // out: date object like obj.year = "2018" obj.month = "04" obj.day = "17"
    //date = time.needISO(date)
    return {
        year:  date.slice(0, 4),
        month: date.slice(5, 7),
        day:   date.slice(-2),
    }
}

time.isLastDayOfMonth = function (date) {
    let { year, month, day } = time.destructISO(date)
    let maxDays = time.daysCountInMonth({ year: year, month: month })
    if (day === maxDays) {
        return true
    }
    return false
}

time.isLastDateOfMonth = time.isLastDayOfMonth

/**
 * @param {array<string>} days
 * @return {array<number>}
 */
time.getUniqueYears = function (days) {
    let uniqueYears = days.reduce((uniqueYears, date) => {
        let /** string */ year = +date.slice(0, 4)
        if (!uniqueYears.includes(year)) {
            uniqueYears.push(year)
        }
        return uniqueYears
    }, [])
    return uniqueYears.sort((x, y) => x - y)
}

/**
 * which — 'first' or 'last' (or neither)
 * @returns {boolean}
 */
time.isDayOfWeek = function (date, which) {
    let weekDay = (new Date(date)).getDay()
    let whichNum = {
        first: 0,
        last: 6
    }[which]
    if (weekDay === whichNum) {
        return true
    }
    return false
}

time.isDateOfWeek = time.isDayOfWeek

/**
 * @param {string|Date} date
 * @return {number} res
 */
time.getWeekNumber = function (date) {
    if (typeof date == 'string') {
        date = new Date(date)
    }
    var d = new Date(Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()))
    var dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    let res = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
    if (res > 50 && date.getMonth() === 0) {
        return 0
    }
    if (date.getMonth() === 11 && res === 1) {
        return 53
    }
    return res
}

/**
 * First or last (or neither) week of month
 * @param {string} date ISO formatted
 */
time.isWeekOfMonth = function (date, which) {
    date = time.needISO(date)
    let referenceDate = date.slice(0, 8) + {
        first: '01',
        last: time.daysCountInMonth({
            month: date.slice(5, 7),
            year: date.slice(0, 4)
        })
    }[which]

    /**
     * If week number of first date equals
     * week number of @param date, first week is true
     */
    let week = getWeekNumber(date)
    let referenceWeek = getWeekNumber(referenceDate)
    if (week === referenceWeek) {
        return true
    }
    return false
}
