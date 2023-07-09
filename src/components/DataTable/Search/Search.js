import { customTheme } from '../utils'
import classes from './Search.module.css'

/**
 * Compopoent to display an input to search value
 *
 * @param {Object}   props
 * @param {Function} props.updateSearchValue
 * @param {Object}   props.themes
 *
 * @returns <Search updateSearchValue={ ... } />
 */
export default function Search({ updateSearchValue, themes }) {

  /**
   * Handle to search value
   *
   * @param {Event} event
   */
  function handleInput(event) {
    event.preventDefault()

    updateSearchValue(event.target.value)
  }

  return (
    <div className={ customTheme(themes, [classes.container], 'customThemeSearchContainer') }>
      <label htmlFor="search">Search</label>
      <input type="text" id="search" onInput={ handleInput }/>
    </div>
  )
}