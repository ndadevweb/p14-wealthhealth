import { themeOverlay, themeModal, themeContent, themeButtonClose } from './utils'
import classes from './Modal.module.css'

/**
 * Modal component
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

  if(open === false) {
    return null
  }

  return (
    <div className={ themeOverlay(themes, classes) } onClick={ () => callbackClose() }>
      <div role="dialog" className={ themeModal(themes, classes) } onClick={ (event) => event.stopPropagation() }>
        <div className={ themeContent(themes, classes) }>
          { children }
        </div>

        <button type="button" className={ themeButtonClose(themes, classes) } onClick={ () => callbackClose() }>
          { labelButton || '✖' }
        </button>
      </div>
    </div>
  )
}
