import { customTheme } from '../utils'

/**
 * Show details about the number entries to display
 *
 * @param {Object} props
 * @param {Number} props.currentPage  current page
 * @param {Number} props.totalEntries number of the entries to display
 * @param {Number} props.fromEntry    first entry
 * @param {Number} props.toEntry      to last entry
 *
 * @returns <ShowingEntries
 *            currentPage={ ... }
 *            totalEntries={ ... }
 *            fromEntry={ ... }
 *            toEntry={ ... }
 *            themes={ ... }
 *          />
 */
export default function ShowingEntries({ currentPage, totalEntries, fromEntry, toEntry, themes }) {

  return (
    <p className={ customTheme(themes, [], 'customShowingEntriesContainer') }>
      Showing <span>{ fromEntry }</span> to <span>{ toEntry }</span> of <span>{ totalEntries }</span> entries
      | Page <span>{ currentPage }</span>
    </p>
  )
}