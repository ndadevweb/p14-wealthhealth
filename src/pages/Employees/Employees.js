import { Link } from 'react-router-dom'
import DataTable from '../../components/DataTable/DataTable'
import { fetchAll } from '../../features/employeesSlice'
import { useSelector } from 'react-redux'

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

  const employees = useSelector(fetchAll)


  return (
    <>
      <h1>Current Employees</h1>
      <DataTable
        data={ employees }
        columns={ dataTablesColumnsConfig }
      />
      <Link to='/'>Home</Link>
    </>
  )
}