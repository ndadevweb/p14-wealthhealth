import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { CreateEmployee } from '../../components'
// import classes from './Home.module.css'

export default function Home() {

  useDocumentTitle('Create employee')

  return (
    <>
      <h2 className="pageTitle">Add a new employee</h2>

      <CreateEmployee />
    </>
  )
}