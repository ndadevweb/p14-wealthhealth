import { themeOverlay, themeModal, themeContent, themeButtonClose } from './utils'
import classes from './Modal.module.css'
import { useEffect, useRef } from 'react'

/**
 * Modal component
 *
 * When displayed the button has focus
 *
 * @param {Object}   props
 * @param {Object}   props.children
 * @param {Boolean}  props.open
 * @param {Function} props.callbackClose
 * @param {String}   props.labelButton (optional)
 * @param {Object}   props.themes (optional)
 *
 * @returns <Modal open{ ... } callbackClose={ ... } labelButton={ ... } themes={ ... } />
 */
export default function Modal({ children, open, callbackClose, labelButton, themes }) {

  const refModal = useRef(null)

  useEffect(() => {
    if(open === true) {
      refModal.current.querySelector('[type="button"]').focus()
    }
  }, [open])

  if(open === false) {
    return null
  }

  return (
    <div className={ themeOverlay(themes, classes) } onClick={ () => callbackClose() }>
      <div role="dialog" className={ themeModal(themes, classes) } onClick={ (event) => event.stopPropagation() } ref={ refModal }>
        <div className={ themeContent(themes, classes) }>
          { children }
        </div>

        <button
          type="button"
          className={ themeButtonClose(themes, classes) }
          onClick={ () => callbackClose() }
        >
          { labelButton || '✖' }
        </button>
      </div>
    </div>
  )
}
