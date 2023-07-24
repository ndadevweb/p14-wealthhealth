import { customTheme } from '../utils'
import Body from './Body/Body'
import Head from './Head/Head'

import classes from './Table.module.css'

/**
 * table that will contain the data
 *
 * @param {Object}   props
 * @param {Array}    props.columns            head column's configuration
 * @param {Object}   props.rows               row column's configuration (optional)
 * @param {Array}    props.data               data to display in the table
 * @param {String}   props.sortByColumn       column on which the sort is active
 * @param {Function} props.updateSortByColumn callback function to sort the data in the table
 * @param {Object}   props.themes             css classes to custom the component
 *
 * @returns <Table
 *            columns={ ... }
 *            rows={ ... }
 *            data={ ... }
 *            sortByColumn={ ... }
 *            updateSortByColumn={ ... }
 *            themes={ ... } />
 */
export default function Table({ columns, rows, data, sortByColumn, updateSortByColumn, themes }) {

  return (
    <div className={ classes.tableContainer }>
      <table className={ customTheme(themes, [classes.table], 'customThemeTable') }>
        <Head columns={ columns } sortByColumn={ sortByColumn } updateSortByColumn={ updateSortByColumn } themes={ themes } />
        <Body rows={ rows } numberOfColumns={ columns.length } data={ data } themes={ themes } />
      </table>
    </div>
  )
}