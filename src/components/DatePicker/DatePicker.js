import { useEffect, useState } from 'react'
import Header from './Header/Header'
import DayNames from './DayNames/DayNames'
import DayNumbers from './DayNumbers/DayNumbers'
import classes from './DatePicker.module.css'

/**
 * DatePicker component
 *
 * @param {Object}   props
 * @param {Date}     props.dateSelected
 * @param {Function} props.updateInputDate
 *
 * @returns <DatePicker dateSelected={ ... } updateInputDate={ ... } />
 */
export default function DatePicker({ dateSelected, updateInputDate }) {

  const defaultDate = new Date()
  const [currentDate, setCurrentDate] = useState(defaultDate)

  useEffect(() => {
    if(isDateValid(dateSelected) === true) {
      const newDate = new Date(dateSelected)

      setCurrentDate(newDate)
    }
  }, [dateSelected])

  function isDateValid(dateSelected) {
    const pattern = /^\d{2}\/\d{2}\/\d{4}$/
    const getTime = (new Date(dateSelected)).getTime()

    return dateSelected.match(pattern) !== null && isNaN(getTime) === false
  }

  /**
   * Update the date
   *
   * @param {Date} newDate
   */
  function updateDate(newDate) {
    setCurrentDate(new Date(newDate))
  }

  /**
   * Update the element uses the DatePicker component
   *
   * @param {Date} newDate
   */
  function updateInput(newDate) {
    const dateFormatted = newDate.toLocaleString('en-US', {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })

    updateInputDate(dateFormatted)
  }

  return (
    <div className={ classes.container }>
      <table>
        <thead>
          <Header
            dateSelected={ currentDate }
            updateDate={ updateDate }
          />
        </thead>
        <tbody>
          <DayNames />
          <DayNumbers dateSelected={ currentDate } updateInputDate={ updateInput } />
        </tbody>
      </table>
    </div>
  )
}