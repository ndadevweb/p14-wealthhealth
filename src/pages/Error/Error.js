import classes from './Error.module.css'

/**
 * Error page
 *
 * @returns <Error />
 */
export default function Error() {

  return (
    <div className={ classes.container }>
      <p>
        <span>Error</span>
        <br />
        <span>404</span>
      </p>
    </div>
  )
}