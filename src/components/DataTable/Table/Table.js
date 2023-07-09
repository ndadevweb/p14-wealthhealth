import { customTheme } from '../utils'
import Body from './Body/Body'
import Head from './Head/Head'

import classes from './Table.module.css'

/**
 * table that will contain the data
 *
 * @param {Object}   props
 * @param {Array}    props.columns
 * @param {Array}    props.data
 * @param {String}   props.sortByColumn
 * @param {Function} props.updateSortByColumn
 *
 * @returns <Table
 *            columns={ ... }
 *            data={ ... }
 *            sortByColumn={ ... }
 *            updateSortByColumn={ ... }
 *            themes={ ... } />
 */
export default function Table({ columns, data, sortByColumn, updateSortByColumn, themes }) {

  return (
    <div className={ classes.tableContainer }>
      <table className={ customTheme(themes, [classes.table], 'customThemeTable') }>
        <Head columns={ columns } sortByColumn={ sortByColumn } updateSortByColumn={ updateSortByColumn } themes={ themes } />
        <Body numberOfColumns={ columns.length } data={ data } themes={ themes } />
      </table>
    </div>
  )
}