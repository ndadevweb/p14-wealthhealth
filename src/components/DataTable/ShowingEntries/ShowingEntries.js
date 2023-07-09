import { customTheme } from '../utils'

/**
 * Show details about the number entries to display
 *
 * @param {Object} props
 * @param {Number} props.totalEntries
 * @param {Number} props.from
 * @param {Number} props.to
 *
 * @returns <ShowingEntries totalEntries={ ... } />
 */
export default function ShowingEntries({ totalEntries, fromEntry, toEntry, themes }) {

  return (
    <p className={ customTheme(themes, [], 'customShowingEntriesContainer') }>
      Showing <span>{ fromEntry }</span> to <span>{ toEntry }</span> of <span>{ totalEntries }</span> entries
    </p>
  )
}