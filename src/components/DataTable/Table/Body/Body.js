import { customTheme } from '../../utils'
import classes from './Body.module.css'

/**
 * body that will contain the data
 *
 * @param {Object} props
 * @param {Number} props.numberOfColumns
 * @param {Array}  props.data
 * @param {Object} props.themes (optional)
 *
 * @returns <Body { numberOfColumns={ ... } data={ ... } themes={ ... } />
 */
export default function Body({ numberOfColumns, data, themes }) {

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