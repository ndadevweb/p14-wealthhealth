import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../../../features/employeesSlice'
import { DatePicker } from 'nda-react-datepicker'
import DropDown from '../../DropDown/DropDown'
import Modal from '../../Modal/Modal'

import stateDataFromJSON from '../../../data/state.json'
import departmentDataFromJSON from '../../../data/department.json'

import classes from './Create.module.css'

import classesDatePicker from '../../../assets/themes/DatePicker/DatePickerTheme.module.css'
import classesDropDown from '../../../assets/themes/DropDown/DropDownTheme.module.css'
import classesModal from '../../../assets/themes/Modal/ModalTheme.module.css'


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

  const [stateCountry, setStateCountry] = useState(stateDataFromJSON.data[0])
  const [department, setDepartment] = useState(departmentDataFromJSON.data[0])

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
      startDate, birthDate,
      department: department.name, street, city, zipCode,
      state: stateCountry.name
    }

    dispatch(create(newEmployee))
    setDisplayModal(true)
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

    if(stateCountry === '') {
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

    setFirstName('')
    setLastName('')
    setBirthDate('')
    setStartDate('')
    setStreet('')
    setCity('')
    setStateCountry(stateDataFromJSON.data[0])
    setDepartment(departmentDataFromJSON.data[0])
    setZipCode('')
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
      <Modal open={ displayModal } callbackClose={ () => setDisplayModal(false) } labelButton='Fermer' themes={ classesModal }>
        Employee created !
      </Modal>

      <form onSubmit={ handleSubmit } autoComplete="off" className={ classes.mainForm }>
        <fieldset>
          <legend>Personnal</legend>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstname" id="firstName" className="inputText" onInput={ event => setFirstName(event.target.value) } />
            { errors.firstName && <span className={ classes.error }>{ errors.firstName }</span> }
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastname" id="lastName" className="inputText" onInput={ event => setLastName(event.target.value) } />
            { errors.lastName && <span className={ classes.error }>{ errors.lastName }</span> }
          </div>

          <div>
            <label htmlFor="birthDate">Date of Birth</label>
            <input
              type="text"
              name="birthdate"
              id="birthDate"
              value={ birthDate }
              className="inputText"
              onInput={ (event) => setBirthDate(event.target.value) }
              onClick={ () => setActiveDateOfBirthDatePicker(activeDateOfBirthDatePicker === false) }
              // onKeyUp={ () => activeDateOfBirthDatePicker === true ? setActiveDateOfBirthDatePicker(false) : null }
              autoComplete="off"
            />
            <div className={ classes.containerDatePicker }>
              {
                activeDateOfBirthDatePicker === true
                  ? <DatePicker
                      dateSelected={ birthDate }
                      updateInputDate={ (newDate) => updateInputDate(newDate, 'birthDate') }
                      themes={ classesDatePicker }
                  />
                  : null
              }
            </div>
            { errors.birthDate && <span className={ classes.error }>{ errors.birthDate }</span> }
          </div>

          <div className={ classes.datepicker }>
            <label htmlFor="startDate">Start Date</label>
            <input
              type="text"
              name="startdate"
              id="startDate"
              value={ startDate }
              className="inputText"
              onInput={ (event) => setStartDate(event.target.value) }
              onClick={ () => setActiveStartDateDatePicker(activeStartDateDatePicker === false) }
              // onKeyUp={ () => activeStartDateDatePicker === true ? setActiveStartDateDatePicker(false) : null }
              autoComplete="off"
            />
            <div className={ classes.containerDatePicker }>
              {
                activeStartDateDatePicker === true
                  ? <DatePicker
                      dateSelected={ startDate }
                      updateInputDate={ (newDate) => updateInputDate(newDate, 'startDate') }
                      themes={ classesDatePicker }
                  />
                  : null
              }
            </div>
            { errors.startDate && <span className={ classes.error }>{ errors.startDate }</span> }
          </div>
        </fieldset>

        <fieldset>
          <legend>Address</legend>

          <div>
            <label htmlFor="street">Street</label>
            <input type="text" name="street" id="street" className="inputText" onInput={ event => setStreet(event.target.value) } />
            { errors.street && <span className={ classes.error }>{ errors.street }</span> }
          </div>

          <div>
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" className="inputText" onInput={ event => setCity(event.target.value) } />
            { errors.city && <span className={ classes.error }>{ errors.city }</span> }
          </div>

          <div>
            <div className={ classes.containerDropdown }>

              <DropDown
                data={ stateDataFromJSON.data }
                currentValue={ stateCountry }
                updateValue={ (stateCountrySelected) => setStateCountry(stateCountrySelected) }
                labelName={ 'State' }
                mapProperties={ { 'value': 'id', 'text': 'name'}}
                themes={ classesDropDown }
              />

            </div>

            { errors.state && <span className={ classes.error }>{ errors.state }</span> }
          </div>

          <div>
            <label htmlFor="zipCode">Zip Code</label>
            <input type="text" name="zipcode" id="zipCode" className="inputText" onInput={ event => setZipCode(event.target.value) } />
            { errors.zipCode && <span className={ classes.error }>{ errors.zipCode }</span> }
          </div>
        </fieldset>

        <fieldset>
          <legend>Department</legend>

          <div>
            <div className={ classes.containerDropdown }>

              <DropDown
                data={ departmentDataFromJSON.data }
                currentValue={ department }
                updateValue={ (stateDepartmentSelected) => setDepartment(stateDepartmentSelected) }
                labelName={ 'Department' }
                mapProperties={ { 'value': 'id', 'text': 'name'}}
                themes={ classesDropDown }
              />

            </div>
            { errors.department && <span className={ classes.error }>{ errors.department }</span> }
          </div>
        </fieldset>

        <button type="submit" className="formBtn">Save</button>
      </form>
    </>
  )
}