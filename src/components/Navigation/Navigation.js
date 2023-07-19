import { Link, useMatch } from 'react-router-dom'

import classes from './Navigation.module.css'

export default function Navigation() {

  return (
    <nav className={ classes.navigation }>
      <ul>
        <li>
          <Link to="/" className={ classes.btn+' '+( useMatch('/') ? classes.active : '' ) }>Home</Link>
        </li>
        <li>
          <Link to="/employees-list" className={ classes.btn+' '+( useMatch('/employees-list') ? classes.active : '' ) }>Employees</Link>
        </li>
      </ul>
    </nav>
  )
}