import { useState } from 'react'
import DatePicker from '../../DatePicker/DatePicker'
import DropDown from '../../DropDown/DropDown'
import Modal from '../../Modal/Modal'
import { useDispatch } from 'react-redux'
import { create } from '../../../features/employeesSlice'

import stateDataFromJSON from '../../../data/state.json'
import departmentDataFromJSON from '../../../data/department.json'

import classes from './Create.module.css'

export default function Create() {

  const [displayModal, setDisplayModal] = useState(false)

  const [errors, setErrors] = useState({})

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [birthDate, setBirthDate] = useState('')
  const [activeDateOfBirthDatePicker, setActiveDateOfBirthDatePicker] = useState(false)

  const [startDate, setStartDate] = useState('')
  const [activeStartDateDatePicker, setActiveStartDateDatePicker] = useState(false)

  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [state, setState] = useState('')
  const [department, setDepartment] = useState('')

  const [zipCode, setZipCode] = useState('')

  const dispatch = useDispatch()


  /**
   * Handle form submit
   *
   * @param {Event} event
   */
  function handleSubmit(event) {
    event.preventDefault()

    const invalidFields = checkValues()

    if(Object.keys(invalidFields).length > 0) {
      setErrors(invalidFields)

      return null
    }

    const newEmployee = {
      firstName, lastName,
      startDate, birthDate: birthDate,
      department, street, city, zipCode,
      state
    }

    dispatch(create(newEmployee))
    reset(event.target)
    setErrors({})
  }

  function checkValues() {
    const invalidFields = {}

    if(firstName === '') {
      invalidFields.firstName = "The 'First Name' field is required"
    }

    if(lastName === '') {
      invalidFields.lastName = "The 'Last Name' field is required"
    }

    if(birthDate === '') {
      invalidFields.birthDate = "The 'Date of birth' field is required"
    } else if(/^\d{2}\/\d{2}\/\d{4}$/.test(birthDate) === false) {
      invalidFields.birthDate = "The 'Date of birth' field must be a valid date {MM/DD/YYYY}"
    }


    if(startDate === '') {
      invalidFields.startDate = "The 'Start Date' field is required"
    } else if(/^\d{2}\/\d{2}\/\d{4}$/.test(startDate) === false) {
      invalidFields.startDate = "The 'Start Date' field must be a valid date {MM/DD/YYYY}"
    }

    if(street === '') {
      invalidFields.street = "The 'Street' field is required"
    }

    if(city === '') {
      invalidFields.city = "The 'City' field is required"
    }

    if(state === '') {
      invalidFields.state = "The 'State' field is required"
    }

    if(zipCode === '') {
      invalidFields.zipCode = "The 'Zip Code' field is required"
    } else if(isNaN(zipCode) === true) {
      invalidFields.zipCode = "The 'Zip Code' field must be a number"
    }

    if(department === '') {
      invalidFields.department = "The 'Department' field is required"
    }

    return invalidFields
  }

  function reset(target) {
    target.reset()

    setDisplayModal(false)
    setFirstName(null)
    setLastName(null)
    setBirthDate('')
    setStartDate('')
    setStreet(null)
    setCity(null)
    setState(null)
    setDepartment(null)
    setZipCode(null)
  }

  /**
   * Callback function used to update the input field
   * of DatePicker
   *
   * @param {Date} newDate
   * @param {String} type birthDate | startDate
   * @throws new Error("Invalid 'type'")
   */
  function updateInputDate(newDate, type) {
    switch(type) {
      case 'birthDate':
        setBirthDate(newDate)
        setActiveDateOfBirthDatePicker(false)
      break

      case 'startDate':
        setStartDate(newDate)
        setActiveStartDateDatePicker(false)
      break

      default:
        throw new Error("Invalid 'type'")
    }
  }

  return (
    <>
      <Modal open={ displayModal } callbackClose={ () => setDisplayModal(false) }>
        Employee created !
      </Modal>

      <form onSubmit={ handleSubmit } autoComplete="off">
        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstname" id="firstName" onInput={ event => setFirstName(event.target.value) } />
          { errors.firstName && <span className={ classes.error }>{ errors.firstName }</span> }
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastname" id="lastName" onInput={ event => setLastName(event.target.value) } />
          { errors.lastName && <span className={ classes.error }>{ errors.lastName }</span> }
        </div>

        <div>
          <label htmlFor="birthDate">Date of Birth</label>
          <input
            type="text"
            name="birthdate"
            id="birthDate"
            value={ birthDate }
            onInput={ (event) => setBirthDate(event.target.value) }
            onClick={ () => setActiveDateOfBirthDatePicker(activeDateOfBirthDatePicker === false) }
            autoComplete="off"
          />
          {
            activeDateOfBirthDatePicker === true
              ? <DatePicker
                  dateSelected={ birthDate }
                  updateInputDate={ (newDate) => updateInputDate(newDate, 'birthDate') }
              />
              : null
          }
          { errors.birthDate && <span className={ classes.error }>{ errors.birthDate }</span> }
        </div>

        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="text"
            name="startdate"
            id="startDate"
            value={ startDate }
            onInput={ (event) => setStartDate(event.target.value) }
            onClick={ () => setActiveStartDateDatePicker(activeStartDateDatePicker === false) }
            autoComplete="off"
          />
          {
            activeStartDateDatePicker === true
              ? <DatePicker
                  dateSelected={ startDate }
                  updateInputDate={ (newDate) => updateInputDate(newDate, 'startDate') }
              />
              : null
          }
          { errors.startDate && <span className={ classes.error }>{ errors.startDate }</span> }
        </div>

        <fieldset>
          <legend>Address</legend>

          <div>
            <label htmlFor="street">Street</label>
            <input type="text" name="street" id="street" onInput={ event => setStreet(event.target.value) } />
            { errors.street && <span className={ classes.error }>{ errors.street }</span> }
          </div>

          <div>
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" onInput={ event => setCity(event.target.value) } />
            { errors.city && <span className={ classes.error }>{ errors.city }</span> }
          </div>

          <div>
            <DropDown data={ stateDataFromJSON.data } callback={ (dataSelected) => setState(dataSelected.id) } options={ { labelName: 'State', defaultValueSelected: 'AL' } } />
            { errors.state && <span className={ classes.error }>{ errors.state }</span> }
          </div>

          <div>
            <label htmlFor="zipCode">Zip Code</label>
            <input type="text" name="zipcode" id="zipCode" onInput={ event => setZipCode(event.target.value) } />
            { errors.zipCode && <span className={ classes.error }>{ errors.zipCode }</span> }
          </div>
        </fieldset>

        <div>
          <DropDown data={ departmentDataFromJSON.data } callback={ (dataSelected) => { setDepartment(dataSelected.name) } } options={ { labelName:  'Department', defaultValueSelected: 0 } } />
          { errors.department && <span className={ classes.error }>{ errors.department }</span> }
        </div>

        <button type="submit">Save</button>
      </form>
    </>
  )
}