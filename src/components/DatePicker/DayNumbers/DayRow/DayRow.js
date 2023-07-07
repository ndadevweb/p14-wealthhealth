import DayCell from '../DayCell/DayCell'

/**
 * Component to display row containing each day of a week
 *
 * @param {Object}   props
 * @param {Array}    props.week
 * @param {Date}     props.dateSelected
 * @param {Function} props.handleClickSelectDay
 * @param {Function} props.handleKeySelectDay
 * @param {Object}   props.themes
 *
 * @returns <DayRow
 *  week={ ... }
 *  dateSelected={ ... }
 *  handleClickSelectDay={ ... }
 *  handleKeySelectDay={ ... }
 *  themes={ ... } />
 */
export default function DayRow({ week, dateSelected, handleClickSelectDay, handleKeySelectDay, themes }) {

  return (
    <tr>
      {
        week.map((day, index) => (
          <DayCell
            key={ index }
            currentDay={ day }
            dateSelected={ dateSelected }
            handleClickSelectDay={ handleClickSelectDay }
            handleKeySelectDay={ handleKeySelectDay }
            themes={ themes }
          />
        ))
      }
    </tr>
  )
}