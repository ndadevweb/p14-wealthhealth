import { Link } from 'react-router-dom'
import DataTable from '../../components/DataTable/DataTable'

import employesDataFromJSON from '../../data/employees2.json'

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

  return (
    <>
      <h1>Current Employees</h1>
      <DataTable
        data={ employesDataFromJSON.data }
        columns={ dataTablesColumnsConfig }
      />
      <Link to='/'>Home</Link>
    </>
  )
}