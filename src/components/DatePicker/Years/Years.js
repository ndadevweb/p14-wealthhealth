/**
 * Return a select component containing a year list
 * between 1950 and 2050
 *
 * @param {Object}   props
 * @param {Date}     props.dateSelected
 * @param {Function} props.updateDate
 *
 * @returns <Year dateSelected={ ... } updateDate={ ... } />
 */
export default function Years({ dateSelected, updateDate }) {

  const startYear = 1950
  const endYear = 2050
  const years = Array.from({ length: endYear - startYear + 1 }, (year, index) => startYear + index)

  /**
   * Handle the selection of the year
   *
   * @param {String} year
   */
  function handleChangeYear(year) {
    dateSelected.setFullYear(year)

    updateDate(dateSelected)
  }

  return (
    <select value={ dateSelected.getFullYear() } onChange={ (event) => handleChangeYear(event.target.value) }>
      {
        years.map((year, index) => <option key={ index } value={ year }>{ year }</option>)
      }
    </select>
  )
}