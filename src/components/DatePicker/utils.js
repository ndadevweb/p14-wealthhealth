/* CONSTANTS */
const LOCALE = 'en-US'

const MAX_INDEX_WEEKDAY = 6
const TOTAL_DAYS_IN_WEEK = 7
const MAX_CELLS_FOR_FIVE_ROWS = 7 * 5
const MAX_CELLS_FOR_SIX_ROWS = 7 * 6

/* Functions used in DatePicker component */

/**
 * Check if the date is valid
 *
 * @param {Date} dateSelected
 * @returns {Boolean}
 */
export function isDateValid(dateSelected) {
  const pattern = /^\d{2}\/\d{2}\/\d{4}$/
  const getTime = (new Date(dateSelected)).getTime()

  return dateSelected.match(pattern) !== null && isNaN(getTime) === false
}

/**
 * Update the element uses the DatePicker component
 *
 * @param {Date} newDate
 * @returns {String} formatted date
 */
export function dateToFormat(newDate) {
  const formattedDate = newDate.toLocaleString(LOCALE, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })

  return formattedDate
}

/* Functions used in DayNumbers component */

/**
 * Return first and last day of a month
 *
 * @param {Date} date
 * @param {String} when current | previous | next
 * @returns {Object}
 */
export function getFirstAndLastDayOfMonth(date, when) {
  const year = date.getFullYear()
  const indexOfMonth = date.getMonth()
  const dateWanted = { firstDay: null, lastDay: null }

  switch(when) {
    case 'current':
      dateWanted.firstDay = new Date(year, indexOfMonth, 1)
      dateWanted.lastDay = new Date(year, indexOfMonth + 1, 0)
    break

    case 'previous':
      dateWanted.firstDay = new Date(year, indexOfMonth - 1, 1)
      dateWanted.lastDay = new Date(year, indexOfMonth, 0)
    break

    case 'next':
      dateWanted.firstDay = new Date(year, indexOfMonth + 1, 1)
      dateWanted.lastDay = new Date(year, indexOfMonth + 2, 0)
    break

    default:
      throw new Error("'"+when+"' value is wrong")
  }

  return dateWanted
}

/**
 * Returns a list of days
 *
 * @param {Date} dateSelected
 * @returns {Array}
 */
export function getDays(dateSelected) {
  const days = []

  const {
    firstDay: currentDateFirstDay,
    lastDay: currentDateLastDay
  } = getFirstAndLastDayOfMonth(dateSelected, 'current')

  // previous month
  const {
    lastDay: previousMonthLastDay
  } = getFirstAndLastDayOfMonth(dateSelected, 'previous')

  const previousMonthTotalDaysToKeep = (
    currentDateFirstDay.getDay() + MAX_INDEX_WEEKDAY
  ) % TOTAL_DAYS_IN_WEEK

  const previousMonthStartDay = previousMonthLastDay.getDate() - previousMonthTotalDaysToKeep

  for(let previousDay = previousMonthStartDay; previousDay <= previousMonthLastDay.getDate(); previousDay++) {
    if(previousMonthTotalDaysToKeep === MAX_INDEX_WEEKDAY) break

    days.push({
      day: previousDay,
      month: previousMonthLastDay.getMonth() + 1,
      year: previousMonthLastDay.getFullYear()
    })
  }

  // current month
  for(let currentDay = 1; currentDay <= currentDateLastDay.getDate(); currentDay++) {
    days.push({
      day: currentDay,
      month: currentDateFirstDay.getMonth() + 1,
      year: currentDateFirstDay.getFullYear()
    })
  }

  // next month
  const {
    firstDay: nextMonthFirstDay
  } = getFirstAndLastDayOfMonth(dateSelected, 'next')

  const daysLeft = days.length > MAX_CELLS_FOR_FIVE_ROWS
    ? MAX_CELLS_FOR_SIX_ROWS - days.length
    : MAX_CELLS_FOR_FIVE_ROWS - days.length

  for(let nextDay = 1; nextDay <= daysLeft; nextDay++) {
    days.push({
      day: nextDay,
      month: nextMonthFirstDay.getMonth() + 1,
      year: nextMonthFirstDay.getFullYear()
    })
  }

  return days
}

/**
 * Return an associative array containing
 * seven days by row
 *
 * @param {Date} dateSelected
 *
 * @returns {Array}
 */
export function getCalendar(dateSelected) {
  const days = getDays(dateSelected)
  const totalDays = days.length
  const calendar = []
  let week = []
  let numberOfDay = 0

  for(let indexDay = 0; indexDay <= totalDays; indexDay++) {
    if(numberOfDay < 7) {
      numberOfDay++
      week.push(days[indexDay])
    } else {
      calendar.push(week)
      numberOfDay = 1
      week = []
      week.push(days[indexDay])
    }
  }

  return calendar
}

/**
 * Return a formatted date corresponding to
 * the precise arguments in parameter
 *
 * @param {Object} props
 * @param {String} props.year
 * @param {String} props.month
 * @param {String} props.day
 *
 * @returns {Date}
 */
export function selectDay({ year, month, day }) {
  const newDate = new Date()

  newDate.setFullYear(year)
  newDate.setMonth(month - 1)
  newDate.setDate(day)

  return newDate
}