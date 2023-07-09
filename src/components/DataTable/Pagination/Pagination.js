import { customTheme } from '../utils'
import classes from './Pagination.module.css'

/**
 * Display the DataTable's pagination
 *
 * @param {Object}   props
 * @param {Number}   props.totalEntries
 * @param {Array}    props.entriesToDisplay
 * @param {Number}   props.currentPage
 * @param {Function} props.updateCurrentPage
 * @param {Object}   props.themes (optional)
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