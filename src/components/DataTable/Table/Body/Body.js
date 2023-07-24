import { customTheme } from '../../utils'
import classes from './Body.module.css'

/**
 * body that will contain the data
 *
 * @param {Object} props
 * @param {Object} props.rows              row's configuration (optional)
 * @param {Number} props.numberOfColumns   number of columns
 * @param {Array}  props.data              data to display
 * @param {Object} props.themes (optional) css classes to custom the component
 *
 * @returns <Body { rows={ ... } numberOfColumns={ ... } data={ ... } themes={ ... } />
 */
export default function Body({ rows, numberOfColumns, data, themes }) {

  return (
    <tbody className={ customTheme(themes, [], 'customThemeContainerBody') }>
      {
        data.length === 0 ? (
          <tr>
            <td colSpan={ numberOfColumns } className={ customTheme(themes, [classes.empty], 'customThemeBodyEmpty') }>
              No data available in table
            </td>
          </tr>
        ) : (
          data.map((entries, index) => (
            <tr key={ index }>
              {
                Object.entries(entries).map((entry, index) => {
                  const [key, value] = entry
                  const align = rows?.[key] !== undefined ? rows[key].align : 'left'

                  return (
                    <td key={ index } align={ align }>
                      { value }
                    </td>
                  )
                })
              }
            </tr>
          ))
        )
      }
    </tbody>
  )
}