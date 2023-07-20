import classes from './ErrorList.module.css'

/**
 * Display a component with errors list
 *
 * @param {Object} props
 * @param {Array}  props.errors
 *
 * @returns <ErrorList errors={ [...] } />
 */
export default function ErrorList({ errors }) {

  if(errors?.[0] === undefined) {
    return <></>
  }

  return (
    <ul className={ classes.container }>
      {
        errors.map((error, index) => (<li key={ index }>{ error }</li>))
      }
    </ul>
  )
}