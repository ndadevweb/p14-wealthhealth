import classes from './DayNumbers.module.css'

/**
 * Component containing list days of the calendar
 *
 * @param {Object}    props
 * @param {Date}      props.dateSelected
 * @param {Function}  props.updateInputDate
 *
 * @returns <DayNumbers dateSelected={ ... } updateInputDate={ ... } />
 */
export default function DayNumbers({ dateSelected, updateInputDate }) {

  const MAX_INDEX_WEEKDAY = 6
  const TOTAL_DAYS_IN_WEEK = 7
  const MAX_CELLS_FOR_FIVE_ROWS = 7 * 5
  const MAX_CELLS_FOR_SIX_ROWS = 7 * 6

  /**
   * Return first and last day of a month
   *
   * @param {Date} date
   * @param {String} when current | previous | next
   * @returns
   */
  function getFirstAndLastDayOfMonth(date, when) {
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
  function getDays(dateSelected) {
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
   * Select day and use callback function updateInputDate
   *
   * @param {Event} event
   */
  function selectDay(event) {
    const { year, month, day } = event.target.dataset
    const newDate = new Date()

    newDate.setFullYear(year)
    newDate.setMonth(month - 1)
    newDate.setDate(day)

    updateInputDate(newDate)
  }

  /**
   * Handle key to select day
   * - use Tab key to move inside the calendar
   * - use Space key to choose a day
   *
   * @param {Event} event
   */
  function handleKey(event) {
    if(event.code === 'Space') {
      selectDay(event)
    }
  }

  /**
   * Build component to display days
   *
   * @param {Date} dateSelected
   *
   * @returns {Array}
   */
  function buildComponent(dateSelected) {
    const days = getDays(dateSelected)
    const component = []

    const maxIndex = days.length - 0
    let currentIndex = 0
    let dayIndex = 0

    while(currentIndex < maxIndex) {

      let cells = []

      while(dayIndex <= MAX_INDEX_WEEKDAY) {
        const { day, month, year } = days[currentIndex]
        const key = year+''+month+''+day
        const newDate = new Date(month+'/'+day+'/'+year)
        const classesList = newDate.getDate() === dateSelected.getDate() && newDate.getMonth() === dateSelected.getMonth()
          ? classes.day+' '+classes.daySelected
          : classes.day

        cells.push(<td
          key={ key }
          className={ classesList }
        >
          <div
            data-key={ key }
            data-year={ year }
            data-month={ month }
            data-day={ day }
            tabIndex={ 0 }
            onClick={ event => selectDay(event) }
            onKeyDown={ event => handleKey(event) }
          >{ day }</div>
        </td>)

        dayIndex++
        currentIndex++
      }

      dayIndex = 0
      component.push(<tr key={ currentIndex } className={ classes.dayRow }>{ cells }</tr>)

      cells = []
    }

    return component
  }

  return (
    <>
      { buildComponent(dateSelected) }
    </>
  )
}