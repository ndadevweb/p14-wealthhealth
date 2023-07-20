import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../../../features/employeesSlice'
import { DatePicker } from 'nda-react-datepicker'
import ErrorList from '../../ErrorList/ErrorList'
import DropDown from '../../DropDown/DropDown'
import Modal from '../../Modal/Modal'

import stateDataFromJSON from '../../../data/state.json'
import departmentDataFromJSON from '../../../data/department.json'

import classes from './Create.module.css'

import classesDatePicker from '../../../assets/themes/DatePicker/DatePickerTheme.module.css'
import classesDropDown from '../../../assets/themes/DropDown/DropDownTheme.module.css'
import classesModal from '../../../assets/themes/Modal/ModalTheme.module.css'
import { useValidateForm } from '../../../hooks/useValidateForm'


export default function Create() {

  const [displayModal, setDisplayModal] = useState(false)

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

  const {
    errors,
    fieldsValidated,
    clearErrors,
    setConfiguration,
    isValid
  } = useValidateForm()

  const dispatch = useDispatch()

  setConfiguration([
    {
      name: 'firstName',
      rules: { required: true, minMax: [2, 30] }
    },
    {
      name: 'lastName',
      rules: { required: true, minMax: [2, 30] }
    },
    {
      name: 'birthDate',
      rules: { required: true, date: { format: 'MM/DD/YYYY'} }
    },
    {
      name: 'startDate',
      rules: { required: true, date: { format: 'MM/DD/YYYY'} }
    },
    {
      name: 'street',
      rules: { required: true, minMax: [5, 100] }
    },
    {
      name: 'city',
      rules: { required: true, min: 2 }
    },
    {
      name: 'state',
      rules: { required: true, inList: stateDataFromJSON.data.map(stateRow => stateRow.name) }
    },
    {
      name: 'zipCode',
      rules: { required: true, numeric: true }
    },
    {
      name: 'department',
      rules: { required: true, inList: departmentDataFromJSON.data.map(departmentRow => departmentRow.name) }
    }
  ])


  /**
   * Handle form submit
   *
   * @param {Event} event
   */
  function handleSubmit(event) {
    event.preventDefault()

    const newEmployee = {
      firstName, lastName,
      startDate, birthDate,
      department: department.name, street, city, zipCode,
      state: stateCountry.name
    }

    if(isValid(newEmployee) === true) {
      dispatch(create(fieldsValidated))
      setDisplayModal(true)
      clearErrors()
      resetForm()
    }
  }

  function resetForm() {
    setActiveDateOfBirthDatePicker(false)
    setActiveStartDateDatePicker(false)
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
            <input type="text" name="firstname" id="firstName" className="inputText" onInput={ event => setFirstName(event.target.value) } value={ firstName }/>
            <ErrorList errors={ errors?.firstName } />
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastname" id="lastName" className="inputText" onInput={ event => setLastName(event.target.value) } value={ lastName } />
            <ErrorList errors={ errors?.lastName } />
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
            <ErrorList errors={ errors?.birthDate } />
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

            <ErrorList errors={ errors?.startDate } />
          </div>
        </fieldset>

        <fieldset>
          <legend>Address</legend>

          <div>
            <label htmlFor="street">Street</label>
            <input type="text" name="street" id="street" className="inputText" onInput={ event => setStreet(event.target.value) } value={ street } />
            <ErrorList errors={ errors?.street } />
          </div>

          <div>
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" className="inputText" onInput={ event => setCity(event.target.value) } value={ city } />
            <ErrorList errors={ errors?.city } />
          </div>

          <div className={ classes.containerDropdown }>
            <DropDown
              data={ stateDataFromJSON.data }
              currentValue={ stateCountry }
              updateValue={ (stateCountrySelected) => setStateCountry(stateCountrySelected) }
              labelName={ 'State' }
              mapProperties={ { 'value': 'id', 'text': 'name'}}
              themes={ classesDropDown }
            />

            <ErrorList errors={ errors?.state } />
          </div>

          <div>
            <label htmlFor="zipCode">Zip Code</label>
            <input type="text" name="zipcode" id="zipCode" className="inputText" onInput={ event => setZipCode(event.target.value) } value={ zipCode } />
            <ErrorList errors={ errors?.zipCode } />
          </div>
        </fieldset>

        <fieldset>
          <legend>Department</legend>

          <div className={ classes.containerDropdown }>
            <DropDown
              data={ departmentDataFromJSON.data }
              currentValue={ department }
              updateValue={ (stateDepartmentSelected) => setDepartment(stateDepartmentSelected) }
              labelName={ 'Department' }
              mapProperties={ { 'value': 'id', 'text': 'name'}}
              themes={ classesDropDown }
            />

            <ErrorList errors={ errors?.department } />
          </div>
        </fieldset>

        <button type="submit" className="formBtn">Save</button>
      </form>
    </>
  )
}