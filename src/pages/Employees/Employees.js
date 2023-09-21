import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { fetchAll } from '../../features/employeesSlice'
import { useSelector } from 'react-redux'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import classes from './Employee.module.css'
import DataTable from '../../components/DataTable/DataTable'
import classesDataTable from '../../assets/themes/DataTable/DataTableTheme.module.css'
import mockEmployees from '../../data/mock/employees.json'

/**
 * Page to display the employees list
 *
 * @returns <Employees />
 */
export default function Employees() {

  const dataTablesColumnsConfig = [
    { id: 'firstName', label: 'First Name', order: 'asc' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'startDate', label: 'Start Date', type: 'date' },
    { id: 'department', label: 'Department' },
    { id: 'birthDate', label: 'Date of Birth', type: 'date' },
    { id: 'street', label: 'Street' },
    { id: 'city', label: 'City' },
    { id: 'state', label: 'State' },
    { id: 'zipCode', label: 'Zip Code' }
  ]

  const dataTablesRowsConfig = {
    zipCode: { align: 'right' }
  }

  const [useMock, setUseMock] = useState(false)

  const refTitlePage = useRef(null)

  const employees = useSelector(fetchAll)

  useDocumentTitle('Employee list')

  return (
    <>
      <h2 className="pageTitle" ref={ refTitlePage }>Current Employees</h2>

      <button className="btn" onClick={ () => setUseMock(() => useMock === false)}>
        {
          useMock === true ? 'Data from Redux' : 'Data from Mock'
        }
      </button>

      <DataTable
        data={ useMock === true ? mockEmployees.data : employees }
        columns={ dataTablesColumnsConfig }
        rows={ dataTablesRowsConfig }
        themes={ classesDataTable }
      />

      <div className={ classes.bottomPageActions }>
        <Link to='/' className="btn">Home</Link>
      </div>
    </>
  )
}