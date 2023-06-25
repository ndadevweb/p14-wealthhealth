
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
export default function ShowingEntries({ totalEntries, fromEntry, toEntry }) {

  return (
    <p>
      Showing { fromEntry } to { toEntry } of { totalEntries } entries
    </p>
  )
}