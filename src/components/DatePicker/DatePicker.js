import { useEffect, useState } from 'react'
import { isDateValid, dateToFormat } from './utils.js'
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

  return (
    <div className={ classes.container }>
      <table>
        <thead>
          <Header
            dateSelected={ currentDate }
            updateDate={ (newDate) => setCurrentDate(new Date(newDate)) }
          />
        </thead>
        <tbody>
          <DayNames />
          <DayNumbers dateSelected={ currentDate } updateInputDate={ (newDate) => updateInputDate(dateToFormat(newDate)) } />
        </tbody>
      </table>
    </div>
  )
}