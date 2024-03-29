import { useState, useId, useRef } from 'react'
import { DatePicker } from 'nda-react-datepicker'
import classesDatePicker from '../../../../assets/themes/DatePicker/DatePickerTheme.module.css'
import classes from './FormDatePicker.module.css'
import ErrorList from '../../../ErrorList/ErrorList'

/**
 * Component to display form input with datepicker
 *
 * @param {Object}   props
 * @param {String}   props.name     name of the input field
 * @param {String}   props.label    label of the input field
 * @param {String}   props.value    value of the input and datepicker
 * @param {Function} props.onChange callback function to update parent component's state
 * @param {Array}    props.errors   errors list
 *
 * @returns <FormDatePicker name={ ... } label={ ... } value={ ... } onChange={ () => ... } errors={ [...] } />
 */
export default function FormDatePicker({ name, label, value, onChange, errors }) {

  const [open, setOpen] = useState(false)

  const containerID = `formDatePicker${useId()}`

  const refInput = useRef(null)

  /**
   * Update the parent component's state
   *
   * @param {Event} event
   */
  function handleOnInput(event) {
    onChange(event.target.value)
  }

  /**
   * Display / hide the datepicker
   */
  function handleToggle() {
    setOpen(() => open === false)
  }

  /**
   * Hide the datepicker when keyboard Escape key
   * is pressed
   *
   * @param {Event} event
   */
  function handleKeyUp(event) {
    if(open === true && event.key === 'Escape') {
      setOpen(() => false)
    }
  }

  /**
   * Change the date
   * Close the DatePicker
   * Add focus on the input field
   *
   * @param {String} value
   */
  function handleOnSelectDate(value) {
    onChange(value)
    setOpen(() => false)
    refInput.current.focus()
  }

  /**
   * Handle blur when the user
   * leave it component container
   *
   * @param {Event} event
   */
  function handleOnBlur(event) {
    if([null, undefined].includes(event.relatedTarget?.closest(`[data-id="${containerID}"]`)) === true) {
      setOpen(() => false)
    }
  }

  return (
    <div data-id={ containerID } onBlur={ handleOnBlur }>
      <label htmlFor={ name }>{ label }</label>

      <div className={ classes.containerInputDatePicker }>
        <button
          type="button"
          title={ open === false ? 'Open calendar' : 'Close calendar' }
          onClick={ handleToggle }
        >
          { open === false ? 'Open' : 'Close' }
        </button>

        <input
          type="text"
          name={ name }
          value={ value }
          className="inputText"
          id={ name }
          ref={ refInput }
          onInput={ handleOnInput }
          onClick={ handleToggle }
          onKeyUp={ handleKeyUp }
          autoComplete="off"
        />
      </div>

      <div className={ classes.containerDatePicker }>
        {
          open === true
            ? <DatePicker
                dateSelected={ value }
                updateSelectedDate={ (dateSelected) => handleOnSelectDate(dateSelected) }
                themes={ classesDatePicker }
            />
            : null
        }
      </div>

      <ErrorList errors={ errors } />
    </div>
  )
}