import { customTheme } from '../utils'
import classes from './Pagination.module.css'

/**
 * Display the DataTable's pagination
 *
 * @param {Object}   props
 * @param {Number}   props.totalEntries      total entries
 * @param {Array}    props.entriesToDisplay  total entries to display on page
 * @param {Number}   props.currentPage       current page
 * @param {Function} props.updateCurrentPage callback function to change the current page
 * @param {Object}   props.themes (optional) css classes to custom the component
 *
 * @returns <Pagination
 *            totalEntries={ ... }
 *            entriesToDisplay={ ... }
 *            currentPage={ ... } updateCurrentPage={ ... }
 *            themes={ ... }
 *          />
 */
export default function Pagination({ totalEntries, entriesToDisplay, currentPage, updateCurrentPage, themes }) {

  const totalPages = Math.ceil(totalEntries / entriesToDisplay)

  if(totalPages <= 1) {
    return <></>
  }

  return (
    <div className={ customTheme(themes, [classes.container], 'customThemePaginationContainer') }>
      <button
        type="button"
        disabled={ currentPage <= 1 }
        onClick={ () => currentPage > 1 ? updateCurrentPage(currentPage - 1) : null }
      >
        Previous
      </button>

      <button
        type="button"
        disabled={ currentPage === totalPages }
        onClick={ () => currentPage < totalPages ? updateCurrentPage(currentPage + 1) : null }
      >
        Next
      </button>
    </div>
  )
}