import classes from './Pagination.module.css'

/**
 * Display the DataTable's pagination
 *
 * @param {Object}   props
 * @param {Number}   props.totalEntries
 * @param {Array}    props.entriesToDisplay
 * @param {Number}   props.currentPage
 * @param {Function} props.updateCurrentPage
 *
 * @returns <Pagination
 *            totalEntries={ ... }
 *            entriesToDisplay={ ... }
 *            currentPage={ ... } updateCurrentPage={ ... }
 *          />
 */
export default function Pagination({ totalEntries, entriesToDisplay, currentPage, updateCurrentPage }) {

  const totalPages = Math.ceil(totalEntries / entriesToDisplay)

  if(totalPages <= 1) {
    return <></>
  }

  return (
    <div>
      <button
        type="button"
        disabled={ currentPage <= 1 }
        className={ classes.button }
        onClick={ () => currentPage > 1 ? updateCurrentPage(currentPage - 1) : null }
      >
        Previous
      </button>

      <button
        type="button"
        disabled={ currentPage === totalPages }
        className={ classes.button }
        onClick={ () => currentPage < totalPages ? updateCurrentPage(currentPage + 1) : null }
      >
        Next
      </button>
    </div>
  )
}