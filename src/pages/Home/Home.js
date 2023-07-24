import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { CreateEmployee } from '../../components'

/**
 * Page to add a new employee
 *
 * @returns <Home />
 */
export default function Home() {

  useDocumentTitle('Create employee')

  return (
    <>
      <h2 className="pageTitle">Add a new employee</h2>

      <CreateEmployee />
    </>
  )
}