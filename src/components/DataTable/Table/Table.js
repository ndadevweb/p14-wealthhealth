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
 * @returns <Table columns={ ... } data={ ... } sortByColumn={ ... } updateSortByColumn={ ... } />
 */
export default function Table({ columns, data, sortByColumn, updateSortByColumn }) {

  return (
    <table className={ classes.table }>
      <Head columns={ columns } sortByColumn={ sortByColumn } updateSortByColumn={ updateSortByColumn } />
      <Body numberOfColumns={ columns.length } data={ data } />
    </table>
  )
}