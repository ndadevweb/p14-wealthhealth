import { useState } from 'react'
import classes from './Modal.module.css'

/**
 * Modal component
 *
 * @param {Object} props
 * @param {Object} props.children
 * @param {Boolean} props.open
 *
 * @returns <Modal open{ ... } />
 */
export default function Modal({ children, open }) {

  const [isOpen, setOpen] = useState(open ? open : false)

  if(isOpen === false) {
    return null
  }

  return (
    <div className={ classes.overlay } onClick={ () => setOpen(false) }>
      <div role="dialog" className={ classes.modal } onClick={ (event) => event.stopPropagation() }>
        <button type="button" className={ classes.close } onClick={ () => setOpen(false) }>✖</button>
        { children }
      </div>
    </div>
  )
}
