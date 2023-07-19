import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import classes from './Header.module.css'

export default function Header() {


  return (
    <header className={ classes.header }>
      <h1 className={ classes.brand }>Wealth Health</h1>

      <div className={ classes.logo }>
        <Link to="/" className={ classes.link } aria-label="Back to home page">
          <span className={ classes.imageLogo }></span>
          <span className={ classes.imageLogoTitle }></span>
        </Link>
      </div>

      <h1 className={ classes.brandTitle }>HRnet</h1>

      <Navigation />
    </header>
  )
}