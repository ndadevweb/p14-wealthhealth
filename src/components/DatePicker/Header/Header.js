import { default as SelectMonthNames } from '../MonthNames/MonthNames'
import { default as SelectYears } from '../Years/Years'
import classes from './Header.module.css'

/**
 * Component to handle the period change of the calendar
 *
 * @param {Object}   props
 * @param {Date}     props.dateSelected
 * @param {Function} props.updateDate
 *
 * @returns <Header dateSelected={ ... } updateDate={ ... } />
 */
export default function Header({ dateSelected, updateDate }) {

  const INDEX_MONTH_DECEMBER = 11
  const INDEX_MONTH_JANUARY = 0

  /**
   * Change current month by the previous
   * Returns a date object corresponding to the selected month
   *
   * @returns {Date}
   */
  function changePeriodToLeft() {
    if(dateSelected.getMonth() === INDEX_MONTH_JANUARY) {
      dateSelected.setMonth(INDEX_MONTH_DECEMBER)
      dateSelected.setFullYear(dateSelected.getFullYear() - 1)
    } else {
      dateSelected.setMonth(dateSelected.getMonth() - 1)
    }

    return dateSelected
  }

  /**
   * Change current month by the next
   * Returns a date object corresponding to the selected month
   *
   * @returns {Date}
   */
  function changePeriodToRight() {
    if(dateSelected.getMonth() === INDEX_MONTH_DECEMBER) {
      dateSelected.setMonth(INDEX_MONTH_JANUARY)
      dateSelected.setFullYear(dateSelected.getFullYear() + 1)
    } else {
      dateSelected.setMonth(dateSelected.getMonth() + 1)
    }

    return dateSelected
  }

  return (
    <tr>
      <td colSpan={ 7 }>
        <div className={ classes.actions }>
          <button type="button" onClick={ () => updateDate(changePeriodToLeft()) }>{'<'}</button>
          <button type="button" onClick={ () => updateDate(new Date()) }>🏠</button>

          <SelectMonthNames
            dateSelected={ dateSelected }
            updateDate={ updateDate }
          />

          <SelectYears
            dateSelected={ dateSelected }
            updateDate={ updateDate }
          />

          <button type="button" onClick={ () => updateDate(changePeriodToRight()) }>{'>'}</button>
        </div>
      </td>
    </tr>
  )
}