import { getCalendar, selectDay } from '../utils'
import DayRow from './DayRow/DayRow'

/**
 * Component containing list days of the calendar
 *
 * @param {Object}    props
 * @param {Date}      props.dateSelected
 * @param {Function}  props.updateInputDate
 *
 * @returns <DayNumbers dateSelected={ ... } updateInputDate={ ... } />
 */
export default function DayNumbers({ dateSelected, updateInputDate, themes }) {

  /**
   * Handle click to select day in the calendar
   *
   * @param {Event} event
   */
  function handleClickSelectDay(event) {
    const newDate = selectDay(event.target.dataset)

    updateInputDate(newDate)
  }

  /**
   * Handle key to select day in the calendar
   *
   * - use Tab key to move inside the calendar
   * - use Space key to choose a day
   *
   * @param {Event} event
   */
  function handleKeySelectDay(event) {
    if(event.code === 'Space') {
      event.preventDefault()

      const newDate = selectDay(event.target.dataset)

      updateInputDate(newDate)
    }
  }

  return (
    <>
      {
        getCalendar(dateSelected).map((week, index) => (
          <DayRow
            key={ index }
            week={ week }
            dateSelected={ dateSelected }
            handleClickSelectDay={ event => handleClickSelectDay(event) }
            handleKeySelectDay={ event => handleKeySelectDay(event) }
            themes={ themes }
          />
        ))
      }
    </>
  )
}