import classes from './DayCell.module.css'

/**
 *
 * @param {Object} props
 * @param {Object} props.currentDay
 * @param {Date}   props.dateSelected
 * @returns
 */
export default function DayCell({ currentDay, dateSelected, handleClickSelectDay, handleKeySelectDay }) {

  const { day, month, year } = currentDay
  const newDate = new Date(month+'/'+day+'/'+year)

  const classesNotCurrentMonth = parseInt(month) !== parseInt(dateSelected.getMonth()) + 1
    ? classes.anotherMonth
    : ''

  const classesList = newDate.getDate() === dateSelected.getDate() && newDate.getMonth() === dateSelected.getMonth()
    ? classes.day+' '+classes.daySelected
    : classes.day+' '+classesNotCurrentMonth

  return (
    <td className={ classes.dayCell }>
      <div
        data-year={ year }
        data-month={ month }
        data-day={ day }
        tabIndex={ 0 }
        className={ classesList }
        onClick={ event => handleClickSelectDay(event) }
        onKeyDown={ event => handleKeySelectDay(event) }
      >
        { day }
      </div>
    </td>
  )
}