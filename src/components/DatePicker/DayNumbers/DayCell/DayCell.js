import classes from './DayCell.module.css'

/**
 * Component to display a day of the month
 *
 * @param {Object}   props
 * @param {Object}   props.currentDay
 * @param {Date}     props.dateSelected
 * @param {Function} props.handleClickSelectDay
 * @param {Function} props.handleKeySelectDay
 * @param {Object}   props.themes
 *
 * @returns <DayCell
 *  currentDay={ ... }
 *  dateSelected={ ... }
 *  handleClickSelectDay={ ... }
 *  handleKeySelectDay={ ... }
 *  themes={ ... } />
 */
export default function DayCell({ currentDay, dateSelected, handleClickSelectDay, handleKeySelectDay, themes }) {

  const { day, month, year } = currentDay
  const newDate = new Date(month+'/'+day+'/'+year)

  function dayCellTheme() {
    const classesList = [classes.dayCell]

    if(themes?.customThemeDayCell !== undefined) {
      classesList.push(themes.customThemeDayCell)
    }

    return classesList.join(' ')
  }

  function dayCellDayTheme() {
    const classesList = []

    // day
    if(themes?.customThemeDayCellDay !== undefined) {
      classesList.push(...[classes.day, themes.customThemeDayCellDay])
    } else {
      classesList.push(classes.day)
    }

    // day selected
    if(newDate.getDate() === dateSelected.getDate() && newDate.getMonth() === dateSelected.getMonth()) {
      classesList.push(classes.daySelected)
    }

    if(themes?.customThemeDayCellDaySelected !== undefined && classesList.indexOf(classes.daySelected) !== -1) {
      classesList.push(themes.customThemeDayCellDaySelected)
    }

    // day from another current month
    if(+month !== +dateSelected.getMonth() + 1) {
      classesList.push(classes.dayAnotherMonth)
    }

    if(themes?.customThemeDayCellDayAnotherMonth !== undefined && classesList.indexOf(classes.dayAnotherMonth) !== -1) {
      classesList.push(themes.customThemeDayCellDayAnotherMonth)
    }

    return classesList.join(' ')
  }

  // const classesNotCurrentMonth = parseInt(month) !== parseInt(dateSelected.getMonth()) + 1
  //   ? classes.dayAnotherMonth
  //   : ''

  // const classesList = newDate.getDate() === dateSelected.getDate() && newDate.getMonth() === dateSelected.getMonth()
  //   ? classes.day+' '+classes.daySelected
  //   : classes.day+' '+classesNotCurrentMonth

  return (
    <td className={ dayCellTheme() }>
      <div
        data-year={ year }
        data-month={ month }
        data-day={ day }
        tabIndex={ 0 }
        className={ dayCellDayTheme() }
        onClick={ event => handleClickSelectDay(event) }
        onKeyDown={ event => handleKeySelectDay(event) }
      >
        { day }
      </div>
    </td>
  )
}