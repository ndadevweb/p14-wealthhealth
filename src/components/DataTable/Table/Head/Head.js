import classes from './Head.module.css'

/**
 * head that will contain the data
 *
 * @param {Object}   props
 * @param {Array}    props.columns
 * @param {Function} props.updateSortByColumn
 * @param {String}   props.sortByColumn
 *
 * @returns <Head columns={ ... } updateSortByColumn={ ... } sortByColunm={ ... } />
 */
export default function Head({ columns, updateSortByColumn, sortByColumn }) {

  function handleClick(event) {
    const { column, order } = event.target.closest('[data-type]').dataset

    updateSortByColumn(column, order)
  }

  return (
    <thead>
      <tr>
        {
          columns.map((column, index) => (
              <th
                tabIndex="0"
                className={ classes.cellHead }
                key={ index }
                data-type="head"
                data-column={ column.id }
                data-order={
                  column.id === sortByColumn.id
                    ? sortByColumn.orderBy
                    : null
                }
                onClick={ (event) => handleClick(event) }
              >
                <div>
                  <span>{ column.label }</span>
                  <span className={ classes.iconsSorting }>
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