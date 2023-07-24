import { customTheme } from '../utils'
import classes from './Pagination.module.css'

/**
 * Display the DataTable's pagination
 *
 * @param {Object}   props
 * @param {Number}   props.currentPage       current page
 * @param {Number}   props.lastPage          last page
 * @param {Function} props.updateCurrentPage callback function to change the current page
 * @param {Object}   props.themes            (optional) css classes to custom the component
 *
 * @returns <Pagination
 *            currentPage={ ... }
 *            lastPage={ ... }
 *            updateCurrentPage={ ... }
 *            themes={ ... }
 *          />
 */
export default function Pagination({ currentPage, lastPage, updateCurrentPage, themes }) {

  if(lastPage <= 1) {
    return <></>
  }

  return (
    <div className={ customTheme(themes, [classes.container], 'customThemePaginationContainer') }>
      <button
        type="button"
        disabled={ currentPage <= 1 }
        onClick={ () => updateCurrentPage(1) }
      >
        First
      </button>

      <button
        type="button"
        disabled={ currentPage <= 1 }
        onClick={ () => currentPage > 1 ? updateCurrentPage(currentPage - 1) : null }
      >
        Previous
      </button>

      <button
        type="button"
        disabled={ currentPage === lastPage }
        onClick={ () => currentPage < lastPage ? updateCurrentPage(currentPage + 1) : null }
      >
        Next
      </button>

      <button
        type="button"
        disabled={ currentPage === lastPage }
        onClick={ () => currentPage < lastPage ? updateCurrentPage(lastPage) : null }
      >
        Last
      </button>
    </div>
  )
}