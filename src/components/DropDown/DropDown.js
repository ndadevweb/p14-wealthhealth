import { useEffect, useState, useId, useRef } from 'react'
import {
  allowedKeysWhenClosed, allowedKeysWhenOpen,
  customTheme,
  getIndexDataByKeyCode
} from './utils'
import classes from './DropDown.module.css'

/**
 * Display a DropDown component
 *
 * @param {Object}   props
 * @param {Object}   props.data          Data to hydrate dropdown values
 * @param {Function} props.updateValue   Callback to update the parent component's state
 * @param {String}   props.labelName     (optional) Text of the label (if empty the label will be not displayed)
 * @param {Object}   props.mapProperties (optional) Map properties of the data
 * @param {Object}   props.themes        (optional) Theme to custom component
 *
 * @returns <DropDown
 *            data={ ... }
 *            currentValue={ ... }
 *            updateValue={ ... }
 *            labelName={ ... }
 *            mapProperties{ ... }
 *            themes={ ... } />
 */
export default function DropDown({
  data,
  currentValue,
  updateValue,
  labelName,
  mapProperties = { value: 'value', text: 'text' },
  themes = {}
}) {

  const defaultIndex = data.findIndex(currentData => currentData[mapProperties['value']] === currentValue[mapProperties['value']])

  // Used to identify the different dropdown when there are several
  const dropdownID = 'dropdown-'+useId()
  const refButton = useRef(null)
  const refItem = useRef([])

  const [open, setOpen] = useState(false)
  const [indexSelectedItem, setIndexSelectedItem] = useState(defaultIndex)
  const [indexHoveredItem, setIndexHoveredItem] = useState(defaultIndex)

  useEffect(() => {
    /**
     * Selected the item inside the list
     */
    function scrollToItemSelected() {
      const itemSelected = refItem.current[indexSelectedItem]
      itemSelected.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    /**
     * Close dropdown when click outside itself
     *
     * @param {Event} event
     */
    function closeDropDown(event) {
      const dataAttribute = `[data-dropdown="${dropdownID}"]`

      if(event.target.closest(dataAttribute) === null) {
        setOpen(() => false)
      }
    }

    if(open === true) {
      document.body.addEventListener('click', closeDropDown)

      scrollToItemSelected()
    }

    return () => document.body.removeEventListener('click', closeDropDown)
  }, [open, indexSelectedItem, dropdownID])

  /**
   * Set the focus on the dropdown
   * when the label element is clicked
   *
   * @param {Event} event
   */
  function handleClickLabel(event) {
    refButton.current.focus()
  }

  /**
   * Close the dropdown when the user
   * leave the component
   *
   * @param {Event} event
   */
  function handleBlur(event) {
    const dataAttribute = `[data-dropdown="${dropdownID}"]`

    if(event?.relatedTarget?.closest(dataAttribute)?.dataset?.dropdown !== dropdownID) {
      setIndexHoveredItem(() => indexSelectedItem)
      setOpen(() => false)
    }
  }

  /**
   * Handle the open / close dropdown
   * when clicked
   */
  function handleClickButton() {
    const mapPropertyValue = mapProperties['id']
    const newIndexSelectedItem = data.findIndex(currentData => currentData[mapPropertyValue] === currentValue[mapPropertyValue])

    setIndexSelectedItem(() => newIndexSelectedItem)
    setIndexHoveredItem(() => newIndexSelectedItem)

    const itemSelected = refItem.current[newIndexSelectedItem]
    itemSelected.scrollIntoView({ behavior: 'smooth', block: 'center' })

    setOpen(() => open === false)
  }

  /**
   * Handle the interactions by keyboards keys
   *
   * @param {Event} event
   */
  function handleKeyDownButton(event) {
    if(open === false && allowedKeysWhenClosed().includes(event.code) === true) {
      event.preventDefault()
      buttonInteractionsAllowedWhenClosed(event.code)
    } else if(open === true && allowedKeysWhenOpen().includes(event.code) === true) {
      event.preventDefault()
      buttonInteractionsAllowedWhenOpen(event.code)
    }
  }

  /**
   * Handle the interactions by keyboards keys
   * when the dropdown is closed
   *
   * Update the value when an item is selected by keyboards keys
   * ArrowUp, ArrowDown, Home, End, PageUp or PageDown keys
   *
   * Open the dropdown with Space key
   *
   * @param {String} keyCode
   */
  function buttonInteractionsAllowedWhenClosed(keyCode) {
    if(['ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(keyCode) === true) {
      const newIndexSelectedItem = getIndexDataByKeyCode(data, currentValue, keyCode)
      const newData = data[newIndexSelectedItem]

      updateValue(() => newData)
      setIndexSelectedItem(() => newIndexSelectedItem)
      setIndexHoveredItem(() => newIndexSelectedItem)
    } else if(keyCode === 'Space') {
      setOpen(() => true)
    }
  }

  /**
   * Handle the interactions by keyboards keys
   * when the dropdown is open
   *
   * Highlight the item when is hovered by keyboards keys
   * ArrowUp, ArrowDown, Home, End, PageUp or PageDown
   *
   * Close the dropdown with Escape key
   *
   * Update the value when an item is selected with Space key
   *
   * @param {String} keyCode
   */
  function buttonInteractionsAllowedWhenOpen(keyCode) {
    if(['ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(keyCode) === true) {
      // Value selected before change
      const currentValueSelected = data[indexHoveredItem]

      // It will be the new index after key pressed
      const newIndex = getIndexDataByKeyCode(data, currentValueSelected, keyCode)

      // Currently selected item
      const itemSelected = refItem.current[indexHoveredItem]

      if(keyCode === 'ArrowUp') {
        itemSelected.previousElementSibling?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      } else if(keyCode === 'ArrowDown') {
        itemSelected.nextElementSibling?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      } else if(['Home', 'PageUp', 'End', 'PageDown'].includes(keyCode) === true) {
        const itemSelected = refItem.current[newIndex]
        itemSelected.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }

      setIndexHoveredItem(() => newIndex)
    } else if(keyCode === 'Escape') {
      const newIndexSelectedItem = getIndexDataByKeyCode(data, currentValue, keyCode)

      setIndexSelectedItem(() => newIndexSelectedItem)
      setIndexHoveredItem(() => newIndexSelectedItem)
      setOpen(() => false)
    } else if(keyCode === 'Space') {
      const newData = data[indexHoveredItem]

      updateValue(() => newData)
      setIndexSelectedItem(() => indexHoveredItem)
      setIndexHoveredItem(() => indexHoveredItem)
      setOpen(() => false)
    }
  }

  /**
   * Handle item click when a value selected
   * and close the dropdown
   *
   * The dropdown button recover the focus
   *
   * @param {Event} event
   */
  function handleClickItemSelected(event) {
    const target = event.target
    const { type, index } = target?.dataset

    if(type !== undefined && index !== undefined && type === 'item') {
      refButton.current.focus()
      updateValue(() => data[+index])
      setOpen(() => false)
    }
  }

  /**
   * Handle the hovering of the dropdown items
   *
   * @param {Event} event
   */
  function handleMouseMoveItem(event) {
    setIndexHoveredItem(+event.target.dataset.index)
  }

  const custhomThemeDropDownList = customTheme(
    themes, [
      classes.dropDownList,
      (open === true ? classes.dropdownOpen : '')
    ],
    'customThemeDropDownList'
  )

  return (
    <div className={ customTheme(themes, [classes.container], 'customThemeContainer') }>
      { labelName !== '' && <label onClick={ (event) => handleClickLabel(event) }>{ labelName }</label> }

      <div className={ customTheme(themes, [classes.dropdown], 'customThemeDropdown') } data-dropdown={ dropdownID }>
        <button
          type="button"
          className={ customTheme(themes, [classes.button], 'customThemeButton') }
          tabIndex={ 0 }
          onClick={ () => handleClickButton() }
          onKeyDown={ (event) => handleKeyDownButton(event) }
          onBlur={ (event) => handleBlur(event) }
          ref={ refButton }
        >
          <span>{ currentValue[mapProperties['text']] }</span>
          <i>▼</i>
        </button>

        <ul
          className={ custhomThemeDropDownList }
          data-name="dropdown-list"
          hidden={ open === false }
          onClick={ (event) => handleClickItemSelected(event) }
          onFocus={ () => refButton.current.focus() }
          tabIndex={ -1 }
        >
          { console.clear() }
          {
            data.map((item, index) => {
              const classesItemDefault = customTheme(themes, [classes.item], 'customThemeItem')
              const classesItemActive = indexHoveredItem === index
                ? customTheme(themes, [classes.itemActive], 'customThemeItemActive')
                : ''
              const classesItem = classesItemDefault+' '+classesItemActive

              return (
                <li
                  key={ item[mapProperties['value']] }
                  data-id={ item[mapProperties['value']] }
                  data-type="item"
                  data-index={ index }
                  className={ classesItem }
                  onMouseMove={ (event) => handleMouseMoveItem(event) }
                  ref={ (element) => refItem.current[index] = element }
                >
                  { item[mapProperties['text']] }
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}