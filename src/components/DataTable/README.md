# React DataTable

React DataTable is a simple component to display, sort and search data


## Description

This component allows you to display information, sort it, search, display by number of items and navigate with pagination

It can receive 4 arguments including 2 optional

- {Array} **data** Data to inject in the DataTable
- {Array} **columns** configuration of the colums to display
- {Number} **maxDefaultTotalEntries** Max entries to display per table page
- {Object} **themes** To change the styles of the component _(Optional)_


## How to use in the project

In your component

**id** => identifies the ownership of the injected data
**label** label to display in the table head
**order** => asc | desc
**type** => date

```
import DataTable from './components/DataTable'
import classesDataTableCustomTheme from './themes/DataTableCustomTheme.module.css'

export default YourComponent() {
    const dataTablesColumnsConfig = {
      { id: 'columnOne', 'label': 'Column One', order: 'asc' },
      { id: 'columnTwo', 'label': 'Column Two', type: 'date' },
      { id: 'columnThree', 'label': 'Column Three' },
    }

    const data = [
      {
        columnOne: 'some data of column 1',
        columnTwo: '07/08/2023',
        columnThree: 'data of the column 3'
      },
      {
        columnOne: 'another some data of column 1',
        columnTwo: '07/10/2023',
        columnThree: 'another data of the column 3'
      },
      {
        columnOne: 'data...',
        columnTwo: '07/02/2023',
        columnThree: 'new data'
      }
    ]

    return (
      <>
        <DataTable
          data={ data }
          columns={ dataTablesColumnsConfig }
          themes={ classesDataTableCustomTheme }
        />
      </>
    )
}
```

Result

The column one will be sorted by ascending (order: 'asc')

The column two must be date type for the sort function to work properly (type: 'date')

```
+-------------------------------+---------------+------------------------------+
| Column one                    | Column Two    | Column Three                 |
+-------------------------------+---------------+------------------------------+
| some data of column 1         | 07/08/2023    | data of the column 3         |
+-------------------------------+---------------+------------------------------+
| another some data of column 1 | 07/10/2023    | another data of the column 3 |
+-------------------------------+---------------+------------------------------+
| some data of column 1         | 07/02/2023    | new data                     |
+-------------------------------+---------------+------------------------------+
```


## How to change style of the React DataTable component

Create a DataTable.module.css

here is a list of selectors to override the component's default styles

```
/* custom theme DataTable component */

.customThemeContainer {}

.customThemeContainerHeader {}

.customThemeContainerData {}


/* custom theme show entries */

.customThemeShowEntriesContainer {}

.customThemeShowEntriesContainer select {}


/* custom theme search */

.customThemeSearchContainer label {}

.customThemeSearchContainer input {}


/* custom theme table */

.customThemeTable {}


/* custom theme table head */

.customThemeContainerHead {}

.customThemeContainerHead th div {}

.customThemeContainerHead th:not(:last-child) {}

.customThemeContainerHead th:hover,
.customThemeContainerHead th:focus {}

.customThemeContainerHeadIconSorting {}

.customThemeContainerHeadIconSorting i:first-child {}

.customThemeContainerHeadIconSorting i:last-child {}

.customThemeCellHead[data-order="asc"] .customThemeContainerHeadIconSorting i:first-child,
.customThemeCellHead[data-order="desc"] .customThemeContainerHeadIconSorting i:last-child {}


/* custom theme table body */

.customThemeContainerBody td {}

.customThemeContainerBody tr:nth-child(even) {}

.customThemeContainerBody tr:hover {}

.customThemeBodyEmpty {}



/* custom theme footer */

.customThemeContainerFooter {}


/* custom theme showing entries */

.customShowingEntriesContainer {}

.customShowingEntriesContainer span {}


/* custom theme pagination */

.customThemePaginationContainer button,
.customThemePaginationContainer button[disabled] {}

.customThemePaginationContainer button:not([disabled]) {}

.customThemePaginationContainer button:hover {}

.customThemePaginationContainer button[disabled],
.customThemePaginationContainer button[disabled]:hover {}

```