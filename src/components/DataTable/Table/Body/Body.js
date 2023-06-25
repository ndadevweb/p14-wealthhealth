import classes from './Body.module.css'

/**
 * body that will contain the data
 *
 * @param {Object} props
 * @param {Number} props.numberOfColumns
 * @param {Array}  props.data
 *
 * @returns <Body { numberOfColumns={ ... } data={ ... } />
 */
export default function Body({ numberOfColumns, data }) {

  return (
    <tbody>
      {
        data.length === 0 ? (
          <tr>
            <td colSpan={ numberOfColumns } className={ classes.empty }>
              No data available in table
            </td>
          </tr>
        ) : (
          data.map((entries, index) => (
            <tr key={ index }>
              {
                Object.values(entries).map((entry, index) => (
                  <td key={ index }>{ entry }</td>
                ))
              }
            </tr>
          ))
        )
      }
    </tbody>
  )
}