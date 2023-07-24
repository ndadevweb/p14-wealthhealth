import {
  MAX_ENTRIES_10,
  MAX_ENTRIES_25,
  MAX_ENTRIES_50,
  MAX_ENTRIES_100
} from '../constants'
import { customTheme } from '../utils'

/**
 * Component to display the available options to show
 * a number of entries in the table
 *
 * Constante Available
 * - MAX_ENTRIES_10
 * - MAX_ENTRIES_25
 * - MAX_ENTRIES_50
 * - MAX_ENTRIES_100
 *
 * @param {object}   props
 * @param {Number}   props.entriesToDisplay       entries displayed
 * @param {Function} props.updateEntriesToDisplay callback function to change the number of the entries to display
 * @param {Object}   props.themes                 css classes to custom the component
 *
 * @returns <ShowEntries entriesToDisplay{ ... } updateEntriesToDisplay={ ... } themes={ ... } />
 */
export default function ShowEntries({ entriesToDisplay, updateEntriesToDisplay, themes }) {

  const optionsAvailable = [
    MAX_ENTRIES_10,
    MAX_ENTRIES_25,
    MAX_ENTRIES_50,
    MAX_ENTRIES_100
  ]

  /**
   * Handle to update entries will be display
   * in the table
   *
   * @param {Number} index
   */
  function handleUpdateEntriesToDisplay(index) {
    if(optionsAvailable[index] === undefined) {
      updateEntriesToDisplay(MAX_ENTRIES_25)
    } else {
      updateEntriesToDisplay(optionsAvailable[index])
    }
  }

  /**
   * Cap the value to select default option
   *
   * @param {Number} number
   *
   * @returns {Number}
   */
  function defaultIndexValue(number) {
    const index = optionsAvailable.findIndex(value => value === +number)
    const indexValidated = index !== -1
      ? index
      : 1

    return indexValidated
  }

  return (
    <div className={ customTheme(themes, [], 'customThemeShowEntriesContainer') }>
      <span>Show </span>
      <select defaultValue={ defaultIndexValue(entriesToDisplay) } onChange={ (event) => handleUpdateEntriesToDisplay(event.target.value) }>
        {
          optionsAvailable.map((value, index) => (
            <option key={ index } value={ index }>{ value }</option>
          ))
        }
      </select>
      <span> entries</span>
    </div>
  )
}