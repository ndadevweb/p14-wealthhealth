/**
 * @typedef {{import './constants'}} Order
 */
import { ORDER_BY_ASC, ORDER_BY_DESC } from './constants'

/**
 * @typedef {{
 *  dataFiltered: Array
 *  fromEntry: number,
 *  toEntry: number
 * }} getEntriesObject
 */

/**
 * @typedef {{
 *  dataSortedByValue: Array
 *  totalEntries: number
 * }} sortDataBeValueObject
 */

/**
 * Get entries grouped by number of items to display per page
 *
 * @param {Array}  data data to browse
 * @param {Number} entriesPerPage number of item to display per page
 * @param {Number} page number of page
 *
 * @returns {getEntriesObject}
 */
export function getEntries(data, entriesPerPage, page) {
  let totalEntries = data.length
  let dataFiltered = []
  let fromEntry = 0
  let toEntry = 0

  if(page <= 1) {
    dataFiltered = [...data.filter((_, index) => index < entriesPerPage)]

    const dataFilteredLength = dataFiltered.length

    fromEntry = dataFilteredLength > 0
      ? 1
      : 0
    toEntry = dataFilteredLength
  } else {
    let fromIndex = (page - 1) * entriesPerPage
    let toIndex = (page * entriesPerPage) - 1

    for(let index = fromIndex; index <= toIndex; index++) {
      if(index >= totalEntries) {
        break
      }

      dataFiltered.push(data[index])
    }

    const dataFilteredLength = dataFiltered.length

    fromEntry = fromIndex + 1
    toEntry = dataFilteredLength === entriesPerPage
      ? fromIndex + entriesPerPage
      : fromEntry - 1 + dataFilteredLength
  }

  return {
    dataFiltered: dataFiltered,
    fromEntry,
    toEntry
  }
}

/**
 * Function to sort number value
 *
 * @param {String} propertyName
 * @param {String} order
 * @returns {Array}
 */
export function sortWhenNumber(propertyName, order) {
  return (itemA, itemB) => {
    const valueA = itemA[propertyName]
    const valueB = itemB[propertyName]

    if(order === ORDER_BY_ASC) {
      return valueA > valueB
    } else if(order === ORDER_BY_DESC) {
      return valueB > valueA
    }

    return 0
  }
}

/**
 * Function to sort string value
 *
 * @param {String} propertyName
 * @param {String} order
 * @returns {Array}
 */
export function sortWhenString(propertyName, order) {
  return (itemA, itemB) => {
    const valueA = itemA[propertyName].toLowerCase()
    const valueB = itemB[propertyName].toLowerCase()

    if(order === ORDER_BY_ASC) {
      return valueA.localeCompare(valueB)
    } else if(order === ORDER_BY_DESC) {
      return valueB.localeCompare(valueA)
    }

    return 0
  }
}

/**
 * Function to sort date value
 *
 * @param {String} propertyName
 * @param {String} order
 * @returns {Array}
 */
export function sortWhenDate(propertyName, order) {
  return (itemA, itemB) => {
    const valueA = new Date(itemA[propertyName])
    const valueB = new Date(itemB[propertyName])

    if(order === ORDER_BY_ASC) {
      return valueA.getTime() > valueB.getTime()
    } else if(order === ORDER_BY_DESC) {
      return valueB.getTime() > valueA.getTime()
    }

    return 0
  }
}

/**
 * Sort data by column
 *
 * @param {Array}  data data to browse
 * @param {Array}  columns data columns
 * @param {String} columnName name of the columnt to sort
 * @param {String} order asc | desc
 *
 * @returns {Array}
 */
export function sortDataByColumn(data, columns, columnName, order) {
  let typeOfColumn = null
  let functionToSortData = null
  let customType = columns.filter(columnToFilter => columnToFilter.id === columnName)

  if(customType[0]?.type === 'date') {
    typeOfColumn = 'date'
  } else {
    typeOfColumn = typeof data[0][columnName]
  }

  const typesOfColumn = {
    'date': sortWhenDate,
    'string': sortWhenString,
    'number': sortWhenNumber
  }

  functionToSortData = typesOfColumn[typeOfColumn](columnName, order)

  const dataToSort = [...data]

  return dataToSort.sort(functionToSortData)
}

/**
 *
 * @param {Array} data data to browse
 * @param {Array} columns data columns
 * @param {String} value value used fo filtered the data
 * @returns {sortDataBeValueObject}
 */
export function sortDataByValue(data, columns, value) {
  const columnsList = columns.map(column => column.id)
  const totalColumns = columnsList.length
  const totalEntries = data.length
  const valueToLowerCase = value.toLowerCase()
  const newData = []
  let lastIndexDataPushed = null

  for(let indexData = 0; indexData < totalEntries; indexData++) {
    for(let indexColumn = 0; indexColumn < totalColumns; indexColumn++) {
      if(lastIndexDataPushed === indexData) {
        break
      }

      const columnId = columnsList[indexColumn]
      const propertyValue = data[indexData][columnId]
        .toString()
        .toLowerCase()

      if(propertyValue.indexOf(valueToLowerCase) !== -1) {
        newData.push(data[indexData])
        lastIndexDataPushed = indexData
      }
    }
  }

  return {
    dataSortedByValue: newData,
    totalEntries: newData.length
  }
}