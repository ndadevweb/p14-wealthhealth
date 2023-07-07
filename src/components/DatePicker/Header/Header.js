import { default as SelectMonthNames } from '../MonthNames/MonthNames'
import { default as SelectYears } from '../Years/Years'
import triangleImage from '../assets/triangle.svg'
import homeImage from '../assets/home.svg'
import classes from './Header.module.css'

/**
 * Component to handle the period change of the calendar
 *
 * @param {Object}   props
 * @param {Date}     props.dateSelected
 * @param {Function} props.updateDate
 * @param {Object}   props.themes
 *
 * @returns <Header dateSelected={ ... } updateDate={ ... } />
 */
export default function Header({ dateSelected, updateDate, themes }) {

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

  function themeActions() {
    const classesList = [classes.actions]

    if(themes?.customThemeButtonsAction !== undefined) {
      classesList.push(themes?.customThemeButtonsAction)
    }

    return classesList.join(' ')
  }

  return (
    <tr>
      <td colSpan={ 7 }>
        <div className={ themeActions() }>
          <button type="button" className={ classes.buttonLeft } onClick={ () => updateDate(changePeriodToLeft()) }>
            <img src={ triangleImage } className={ classes.triangleLeft } alt="Left" />
          </button>

          <button type="button" onClick={ () => updateDate(new Date()) }>
            <img src={ homeImage } className={ classes.home } alt="Home" />
          </button>

          <SelectMonthNames
            dateSelected={ dateSelected }
            updateDate={ updateDate }
          />

          <SelectYears
            dateSelected={ dateSelected }
            updateDate={ updateDate }
          />

          <button type="button" className={ classes.buttonRight} onClick={ () => updateDate(changePeriodToRight()) }>
            <img src={ triangleImage } className={ classes.trianglerRight } alt="Right" />
          </button>
        </div>
      </td>
    </tr>
  )
}