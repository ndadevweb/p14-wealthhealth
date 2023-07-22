import { useState } from 'react'
import { MAX_ENTRIES_10 as MAX_DEFAULT_ENTRIES } from './constants'
import { ORDER_BY_ASC, ORDER_BY_DESC } from './constants'
import { customTheme, getEntries, sortDataByColumn, sortDataByValue } from './utils'
import ShowEntries from './ShowEntries/ShowEntries'
import Search from './Search/Search'
import Table from './Table/Table'
import ShowingEntries from './ShowingEntries/ShowingEntries'
import Pagination from './Pagination/Pagination'
import classes from './DataTable.module.css'

/**
 * DataTable to display data
 *
 * @param {Object} props
 * @param {Array}  props.data
 * @param {Array}  props.columns
 * @param {Object} props.rows
 * @param {Number} props.maxDefaultTotalEntries
 * @param {Object} props.themes (optional)
 *
 * @returns <DataTable data={ ... } columns={ ... } rows={ ... } maxDefaultEntries={ ... } />
 */
export default function DataTable({ data, columns, rows, maxDefaultEntries, themes }) {

  const defaultColumnToSort = columns
    .filter(column => column.hasOwnProperty('order'))
    .pop()

  const [entriesToDisplay, setEntriesToDisplay] = useState(maxDefaultEntries || MAX_DEFAULT_ENTRIES)

  const [searchValue, setSearchValue] = useState('')

  const [sortBy, setSortBy] = useState({
    id: defaultColumnToSort?.id || null,
    orderBy: defaultColumnToSort?.order || null
  })

  const [currentPage, setCurrentPage] = useState(1)

  /**
   * Use to sort data by an interaction with a column
   *
   * @param {String} column
   */
  function handleSortBy(column) {
    const newSortBy = { id: column }

    if(sortBy.orderBy === ORDER_BY_ASC) {
      newSortBy.orderBy = ORDER_BY_DESC
    } else {
      newSortBy.orderBy = ORDER_BY_ASC
    }

    setSortBy(newSortBy)
  }

  const dataSorted = data.length > 0
    ? sortDataByColumn(data, columns, sortBy.id, sortBy.orderBy)
    : []

  const { dataSortedByValue, totalEntries } = sortDataByValue(dataSorted, columns, searchValue)

  const { dataFiltered, fromEntry, toEntry } = getEntries(dataSortedByValue, entriesToDisplay, currentPage)


  return (
    <div className={ customTheme(themes, [classes.container], 'customThemeContainer') }>
      <div className={ customTheme(themes, [classes.header], 'customThemeContainerHeader') }>
        <ShowEntries
          entriesToDisplay={ entriesToDisplay }
          updateEntriesToDisplay={ (number) => setEntriesToDisplay(number) }
          themes={ themes }
        />
        <Search
          updateSearchValue={ (value) => setSearchValue(value) }
          themes={ themes }
        />
      </div>

      <div className={ customTheme(themes, [classes.data], 'customThemeContainerData') }>
        <Table
          columns={ columns }
          rows={ rows }
          data={ dataFiltered }
          sortByColumn={ sortBy }
          updateSortByColumn={ (column, order) => handleSortBy(column, order) }
          themes={ themes }
        />
      </div>

      <div className={ customTheme(themes, [classes.footer], 'customThemeContainerFooter') }>
        <ShowingEntries
          totalEntries={ totalEntries }
          fromEntry={ fromEntry }
          toEntry={ toEntry }
          themes={ themes }
        />
        <Pagination
          totalEntries={ totalEntries }
          entriesToDisplay={ entriesToDisplay }
          currentPage={ currentPage }
          updateCurrentPage= { (number) => setCurrentPage(number) }
          themes={ themes }
        />
      </div>
    </div>
  )
}