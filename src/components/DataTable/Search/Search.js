import classes from './Search.module.css'

/**
 * Compopoent to display an input to search value
 *
 * @param {Object}   props
 * @param {Function} props.updateSearchValue
 *
 * @returns <Search updateSearchValue={ ... } />
 */
export default function Search({ updateSearchValue }) {

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
    <div>
      <label htmlFor="search">Search :</label>
      <input type="text" id="search" onInput={ handleInput }/>
    </div>
  )
}