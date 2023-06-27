import { useRef, useState, useEffect } from 'react'
import classes from './DropDown.module.css'

/**
 * DropDown component
 *
 * @param {Object}        props
 * @param {Array<Object>} props.data
 * @param {Function}      props.callback
 * @param {Object}        props.options ( labelName )
 *
 * @returns <DropDown data={ ... } callback={ ... } options={ ... } />
 */
export default function DropDown({ data, callback, options = {} }) {

  const { defaultValueSelected, labelName } = options
  const defaultIndexValueIfExists = data.findIndex(item => item.id === defaultValueSelected)

  // index of a confirmed value
  const [defaultIndexValue, setDefaultIndexValue] = useState(
    defaultIndexValueIfExists !== -1 ? defaultIndexValueIfExists : 0
  )

  // index of an element selected by mouse over or keyboard and not confirmed
  const [indexSelectedInList, setIndexSelectedInList] = useState(defaultIndexValue)
  const [indexesSearchWord, setIndexesSearchWord] = useState({ letter: null, indexes: [], current: null})
  const [isOpen, setOpen] = useState(false)

  const refButton = useRef(null)
  const refList = useRef(null)

  useEffect(() => {
    if(isOpen === true) {
      document.body.addEventListener('click', closeDropDownWhenClickOutside)

      // prevents the positioning of the focus on a selected and unconfirmed element
      setIndexSelectedInList(defaultIndexValue)
    }

    callback(defaultIndexValue !== -1 ? data[defaultIndexValue] : null)

    return () => document.body.removeEventListener('click', closeDropDownWhenClickOutside)
  }, [isOpen, defaultIndexValue, callback, data])

  /**
   * Call a callback function of
   * the parent component
   *
   * @param {Number} index
   */
  function execCallback(index) {
    if(callback) {
      callback({
        id: data[index].id,
        name: data[index].name
      })
    }
  }

  /**
   * Close the DropDown component when
   * a click mouse is outside
   *
   * @param {Event} event
   */
  function closeDropDownWhenClickOutside(event) {
    if(event.target.closest('div[data-name="dropdown"]') === null) {
      setOpen(false)
    }
  }

  /**
   * Add focus on the button when the
   * label is clicked
   */
  function handleClickLabel() {
    refButton.current.focus()
  }

  /**
   * Keyboard keys that can be used when the DropDown
   * component is in closed status
   *
   * Keys allowed
   * - A between Z : to find a word starts with the letter used
   * - Space : to open the DropDown list
   * - Home / PageUp : to select first word in the list
   * - End / PageDown : to select last word in the list
   * - ArrowUp / ArrowDown : to navigate from word to word
   *
   * @param {Event} event
   */
  async function actionsAllowedWhenIsClosed(event) {
    if(event.code === 'Space') {
      setOpen(true)

      // place the focus on the previously selected element
      const refLi = await refList.current.children[defaultIndexValue]
      refList.current.scroll(0, refLi.offsetTop)
    }

    if(['Home', 'PageUp'].includes(event.code) === true) {
      setDefaultIndexValue(0)
      setIndexSelectedInList(0)
      execCallback(0)
    } else if(['End', 'PageDown'].includes(event.code) === true) {
      const lastIndex = data.length - 1

      setDefaultIndexValue(lastIndex)
      setIndexSelectedInList(lastIndex)
      execCallback(lastIndex)
    }

    if(event.code === 'ArrowUp') {
      const newIndex = defaultIndexValue === 0
        ? defaultIndexValue
        : defaultIndexValue - 1

      setDefaultIndexValue(newIndex)
      setIndexSelectedInList(newIndex)
      execCallback(newIndex)
    } else if(event.code === 'ArrowDown') {
      const newIndex = defaultIndexValue === data.length - 1
        ? defaultIndexValue
        : defaultIndexValue + 1

      setDefaultIndexValue(newIndex)
      setIndexSelectedInList(newIndex)
      execCallback(newIndex)
    }

    searchWordByFirstLetter(event)
  }

  /**
   * Keyboard keys that can be used when the DropDown
   * component is in open status
   *
   * Keys allowed
   * - A between Z : to find a word starts with the letter used
   * - Space : to close the DropDown list and select a word in the list
   * - Escape: to close the DropDown without select a word in the list
   * - Home / PageUp : to select first word in the list
   * - End / PageDown : to select last word in the list
   * - ArrowUp / ArrowDown : to navigate from word to word
   *
   * @param {Event} event
   */
  function actionsAllowedWhenIsOpen(event) {
    event.preventDefault()

    if(event.code === 'Space') {
      setDefaultIndexValue(indexSelectedInList)
      execCallback(indexSelectedInList)
    }

    if(['Space', 'Escape'].includes(event.code) === true) {
      setOpen(false)
      setIndexSelectedInList(defaultIndexValue)
    }

    if(['Home', 'PageUp'].includes(event.code) === true) {
      setIndexSelectedInList(0)

      // place the focus on the previously selected element
      refList.current.scroll(0, 0)
    } else if(['End', 'PageDown'].includes(event.code) === true) {
      setIndexSelectedInList(data.length - 1)

      // place the focus on the previously selected element
      const refLi = refList.current.children[data.length - 1]
      refList.current.scroll(0, refLi.offsetTop)
    }

    if(event.code === 'ArrowUp') {
      const newIndex = indexSelectedInList === 0
        ? indexSelectedInList
        : indexSelectedInList - 1

      setIndexSelectedInList(newIndex)

      // place the focus on the previously selected element
      const refLi = refList.current.children[newIndex]
      if(refLi.offsetTop >= 0) {
        refList.current.scroll(0, refLi.offsetTop)
      }

    } else if(event.code === 'ArrowDown') {
      const newIndex = indexSelectedInList === data.length - 1
        ? indexSelectedInList
        : indexSelectedInList + 1

      setIndexSelectedInList(newIndex)

      // place the focus on the previously selected element
      const refLi = refList.current.children[newIndex]
      if(refList.current.clientHeight - refLi.offsetTop <= refLi.clientHeight) {
        const index = +refLi.dataset.index
        refList.current.scroll(0, (index * refLi.clientHeight) - (refList.current.clientHeight - refLi.clientHeight))
      }
    }

    searchWordByFirstLetter(event)
  }

  /**
   * Key A between Z to select a word in the DropDown list
   *
   * @param {Event} event
   */
  function searchWordByFirstLetter(event) {

    if(event.keyCode < 65 || event.keyCode > 90) {
      return null
    }

    const letter = event.key.toLowerCase()
    const newIndexesSearchWord = { ...indexesSearchWord }

    if(newIndexesSearchWord.current === null || newIndexesSearchWord.letter !== letter) {
      newIndexesSearchWord.letter = letter
      newIndexesSearchWord.indexes = data.map((item, index) => ({ item, index }))
        .filter(({ item }) => item.name.toLowerCase().startsWith(letter) ===  true)
        .map(item => item.index)
      newIndexesSearchWord.current = newIndexesSearchWord.indexes[0]
    } else if(newIndexesSearchWord.current === newIndexesSearchWord.indexes[newIndexesSearchWord.indexes.length - 1]) {
      newIndexesSearchWord.current = newIndexesSearchWord.indexes[0]
    } else {
      newIndexesSearchWord.current += 1
    }

    if(newIndexesSearchWord.indexes.length === 0) {
      setIndexesSearchWord({ letter: null, indexes: [], current: null })
    } else {
      setIndexesSearchWord(newIndexesSearchWord)
      setDefaultIndexValue(newIndexesSearchWord.current)
      setIndexSelectedInList(newIndexesSearchWord.current)
      execCallback(newIndexesSearchWord.current)

      // place the focus on the previously selected element
      const refLi = refList.current.children[newIndexesSearchWord.current]
      refList.current.scroll(0, refLi.offsetTop)
    }
  }

  /**
   * Allow to interact with the DropDown component
   * See the functions :
   * - actionsAllowedWhenIsOpen()
   * - actionsAllowedWhenIsClosed()
   *
   * @param {Event} event
   */
  function handleKeyDown(event) {
    if(
      (
        ['ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown', 'Space', 'Escape'].includes(event.code) === false
        && (event.keyCode < 65 || event.keyCode > 90) === true
      ) || event.ctrlKey === true
    ) {
      return null
    }

    event.preventDefault()

    if(isOpen === true) {
      actionsAllowedWhenIsOpen(event)
    } else {
      actionsAllowedWhenIsClosed(event)
    }
  }

  /**
   * Open / close the DropDown component
   *
   * @param {Event} event
   */
  async function handleClickButton(event) {
    setOpen(isOpen === false)

    // place the focus on the previously selected element
    if(isOpen === false) {
      const refLi = await refList.current.children[defaultIndexValue]

      refList.current.scroll(0, refLi.offsetTop)
    }
  }

  /**
   * Active the item when the mouse cursor
   * is over it
   *
   * @param {Event} event
   */
  function handleMouseOverItem(event) {
    event.preventDefault()
    setIndexSelectedInList(+event.target.dataset.index)
  }

  /**
   * Select an item and close the DropDown component
   *
   * @param {Event} event
   */
  function handleClickItem(event) {
    setDefaultIndexValue(+event.target.dataset.index)
    execCallback(+event.target.dataset.index)
    setOpen(false)

    refButton.current.focus()
  }

  return (
    <div className={ classes.container }>
      <label onClick={ handleClickLabel }>{ labelName }</label>

      <div className={ classes.dropdown } data-name="dropdown">
        <span
          ref={ refButton }
          data-id={ data[defaultIndexValue].id }
          className={ classes.button }
          tabIndex={ 0 }
          onClick={ (event) => handleClickButton(event) }
          onKeyDown={ (event) => handleKeyDown(event) }
        >
          <span>{ data[defaultIndexValue].name }</span>
          <i>▼</i>
        </span>

        <ul
          ref={ refList }
          className={ classes.dropDownList }
          hidden={ isOpen === false }
          data-name="dropdown-list"
        >
          {
            data.map((item, index) => {
              const classesItem = isOpen === true && indexSelectedInList === index
                ? classes.item+' '+classes.itemActive
                : classes.item

              return (
                <li
                  key={ item.id }
                  data-id={ item.id }
                  data-index={ index }
                  className={ classesItem }
                  onClick={ (event) => handleClickItem(event) }
                  onMouseMove={ (event) => handleMouseOverItem(event) }
                >
                  { item.name }
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}