import { Link } from 'react-router-dom'

export default function Navigation() {

  return (
    <nav>
      <Link to="/">
        Home
      </Link>
      <Link to="/employees-list">
        View Current Employees
      </Link>
    </nav>
  )
}