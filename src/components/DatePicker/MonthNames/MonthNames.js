/**
 * Display and update month selected
 *
 * @param {Object}   props
 * @param {Date}     props.dateSelected
 * @param {Function} props.updateDate
 *
 * @returns <MonthNames dateSelected={ ... } updateDate={ ... } />
 */
export default function MonthNames({ dateSelected, updateDate }) {

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ]

  /**
   * Change the month
   *
   * @param {Number} indexOfMonth
   */
  function handleChangeMonth(indexOfMonth) {
    dateSelected.setMonth(indexOfMonth)

    updateDate(dateSelected)
  }

  return (
    <select value={ dateSelected.getMonth() } onChange={ (event) => handleChangeMonth(event.target.value) }>
      {
        months.map((month, index) => <option key={ index } value={ index }>{ month }</option>)
      }
    </select>
  )
}