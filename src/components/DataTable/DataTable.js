import { useEffect, useState } from 'react'
import { MAX_ENTRIES_10 as MAX_DEFAULT_ENTRIES } from './constants'
import { ORDER_BY_ASC, ORDER_BY_DESC } from './constants'
import { customTheme, getEntries, sortDataByColumn, sortDataByValue, maxPage } from './utils'
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
 * @param {Array}  props.data                   containing data to display
 * @param {Array}  props.columns                column's configuration
 * @param {Object} props.rows                   row's configuration
 * @param {Number} props.maxDefaultTotalEntries number max of entries to display per page
 * @param {Object} props.themes (optional)      css classes to custom style of the DataTable
 *
 * @returns <DataTable
 *            data={ ... }
 *            columns={ ... }
 *            rows={ ... }
 *            maxDefaultEntries={ ... }
 *            themes={ ... }
 *          />
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

  const [maxPageAvailable, setMaxPageAvailable] = useState(1)

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

  /**
   * Change the number of entries to display
   * per page and updates the page number only
   * if the current page is greater than the number
   * of entries it is supposed to be able to display
   *
   * @param {Number} numberOfEntriesPerPage
   */
  function updateEntriesToDisplay(numberOfEntriesPerPage) {
    const dataLength = data.length

    const pageMaxAfterChange = maxPage(numberOfEntriesPerPage, dataLength)
    if(pageMaxAfterChange < currentPage) {
      setCurrentPage(() => pageMaxAfterChange)
    }

    setEntriesToDisplay(() => numberOfEntriesPerPage)
  }

  // rest of the data after sorting
  const dataSorted = data.length > 0
    ? sortDataByColumn(data, columns, sortBy.id, sortBy.orderBy)
    : []

  const { dataSortedByValue, totalEntries } = sortDataByValue(dataSorted, columns, searchValue)

  const { dataFiltered, fromEntry, toEntry } = getEntries(dataSortedByValue, entriesToDisplay, currentPage)

  useEffect(() => {
    const newMaxPageAvailable = maxPage(entriesToDisplay, dataSortedByValue.length) || 1

    if(newMaxPageAvailable !== maxPageAvailable) {
      setMaxPageAvailable(() => maxPage(entriesToDisplay, dataSortedByValue.length))
    }

    if(newMaxPageAvailable < currentPage) {
      setCurrentPage(() => newMaxPageAvailable)
    }
  }, [dataSortedByValue, entriesToDisplay, currentPage, setCurrentPage, maxPageAvailable, setMaxPageAvailable])

  return (
    <div className={ customTheme(themes, [classes.container], 'customThemeContainer') }>
      <div className={ customTheme(themes, [classes.header], 'customThemeContainerHeader') }>
        <ShowEntries
          entriesToDisplay={ entriesToDisplay }
          updateEntriesToDisplay={ (numberOfEntriesPerPage) => updateEntriesToDisplay(numberOfEntriesPerPage) }
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
          currentPage={ currentPage }
          totalEntries={ totalEntries }
          fromEntry={ fromEntry }
          toEntry={ toEntry }
          themes={ themes }
        />
        <Pagination
          currentPage={ currentPage }
          // lastPage={ maxPage(entriesToDisplay, totalEntries) }
          lastPage={ maxPageAvailable }
          updateCurrentPage= { (number) =>  setCurrentPage(number) }
          themes={ themes }
        />
      </div>
    </div>
  )
}