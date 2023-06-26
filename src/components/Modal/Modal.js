import classes from './Modal.module.css'

/**
 * Modal component
 *
 * @param {Object}   props
 * @param {Object}   props.children
 * @param {Boolean}  props.open
 * @param {Function} props.callbackClose
 *
 * @returns <Modal open{ ... } />
 */
export default function Modal({ children, open, callbackClose }) {

  if(open === false) {
    return null
  }

  return (
    <div className={ classes.overlay+' '+classes.open } onClick={ () => callbackClose() }>
      <div role="dialog" className={ classes.modal } onClick={ (event) => event.stopPropagation() }>
        <button type="button" className={ classes.close } onClick={ () => callbackClose() }>✖</button>
        { children }
      </div>
    </div>
  )
}
