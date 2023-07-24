import { customTheme } from '../../utils'
import classes from './Head.module.css'

/**
 * head that will contain the data
 *
 * It is possible to navigate with key Tab inside th
 *  and sort data with key Space
 *
 * @param {Object}   props
 * @param {Array}    props.columns            columns of the table's head
 * @param {Function} props.updateSortByColumn callback function to sort the data in the table
 * @param {String}   props.sortByColumn       column on which the sort is active
 * @param {Object}   props.themes             css classes to custom the component
 *
 * @returns <Head columns={ ... } updateSortByColumn={ ... } sortByColunm={ ... }  themes={ ... } />
 */
export default function Head({ columns, updateSortByColumn, sortByColumn, themes }) {

  /**
   * Sort data when click on the column
   *
   * @param {Event} event
   */
  function handleClick(event) {
    const { column, order } = event.target.closest('[data-type]').dataset

    updateSortByColumn(column, order)
  }

  /**
   * Sort data when key Space pressed on the column
   *
   * @param {Event} event
   */
  function handleKeyUp(event) {
    if(event.code !== 'Space') {
      return null
    }

    const { column, order } = event.target.closest('[data-type]').dataset

    updateSortByColumn(column, order)
  }

  return (
    <thead className={ customTheme(themes, [], 'customThemeContainerHead') }>
      <tr>
        {
          columns.map((column, index) => (
              <th
                className={ customTheme(themes, [classes.cellHead], 'customThemeCellHead') }
                key={ index }
                data-type="head"
                data-column={ column.id }
                data-order={
                  column.id === sortByColumn.id
                    ? sortByColumn.orderBy
                    : null
                }
                onClick={ (event) => handleClick(event) }
                onKeyUp={ (event) => handleKeyUp(event) }
              >
                <div tabIndex="0">
                  <span>{ column.label }</span>
                  <span className={ customTheme(themes, [classes.iconsSorting], 'customThemeContainerHeadIconSorting') }>
                    <i>▲</i>
                    <i>▼</i>
                  </span>
                </div>
              </th>
            )
          )
        }
      </tr>
    </thead>
  )
}