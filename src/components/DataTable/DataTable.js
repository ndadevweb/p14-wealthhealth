import { useState } from 'react'
import { MAX_ENTRIES_10 as MAX_DEFAULT_ENTRIES } from './constants'
import { ORDER_BY_ASC, ORDER_BY_DESC } from './constants'
import { getEntries, sortDataByColumn, sortDataByValue } from './utils'
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
 * @param {Number} props.maxDefaultTotalEntries
 *
 * @returns <DataTable data={ ... } columns={ ... } maxDefaultEntries={ ... } />
 */
export default function DataTable({ data, columns, maxDefaultEntries }) {

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

  function handleSortBy(column) {
    const newSortBy = { id: column }

    if(sortBy.orderBy === ORDER_BY_ASC) {
      newSortBy.orderBy = ORDER_BY_DESC
    } else {
      newSortBy.orderBy = ORDER_BY_ASC
    }

    setSortBy(newSortBy)
  }


  // 1 - trier par colonne selectionnee ( state pour conserver colonne et type de tri )
  // 2 - trier par valeur du champs search ( state pour conserver valeur saisie )
  // 3 - trier les donnees par nombre d'items a afficher


  const defaultDataLength = data.length

  const dataSorted = defaultDataLength > 0
    ? sortDataByColumn(data, columns, sortBy.id, sortBy.orderBy)
    : []

  const { dataSortedByValue, totalEntries } = sortDataByValue(dataSorted, columns, searchValue)

  const { dataFiltered, fromEntry, toEntry } = getEntries(dataSortedByValue, entriesToDisplay, currentPage)

  return (
    <div className={ classes.container }>
      <div className={ classes.header }>
        <ShowEntries
          entriesToDisplay={ entriesToDisplay }
          updateEntriesToDisplay={ (number) => setEntriesToDisplay(number) }
        />
        <Search
          updateSearchValue={ (value) => setSearchValue(value) }
        />
      </div>

      <div className={ classes.data }>
        <Table
          columns={ columns }
          data={ dataFiltered }
          sortByColumn={ sortBy }
          updateSortByColumn={ (column, order) => handleSortBy(column, order) }
        />
      </div>

      <div className={ classes.footer }>
        <ShowingEntries
          totalEntries={ totalEntries }
          fromEntry={ fromEntry }
          toEntry={ toEntry }
        />
        <Pagination
          totalEntries={ totalEntries }
          entriesToDisplay={ entriesToDisplay }
          currentPage={ currentPage }
          updateCurrentPage= { (number) => setCurrentPage(number) }
        />
      </div>
    </div>
  )
}