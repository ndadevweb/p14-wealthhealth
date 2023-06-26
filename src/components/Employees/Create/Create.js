import { useState } from 'react'
import DatePicker from '../../DatePicker/DatePicker'
import DropDown from '../../DropDown/DropDown'
import Modal from '../../Modal/Modal'
import { useDispatch } from 'react-redux'
import { create } from '../../../features/employeesSlice'

import stateDataFromJSON from '../../../data/state.json'
import departmentDataFromJSON from '../../../data/department.json'

export default function Create() {

  const [displayModal, setDisplayModal] = useState(false)

  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)

  const [dateOfBirth, setDateOfBirth] = useState('')
  const [activeDateOfBirthDatePicker, setActiveDateOfBirthDatePicker] = useState(false)

  const [startDate, setStartDate] = useState('')
  const [activeStartDateDatePicker, setActiveStartDateDatePicker] = useState(false)

  const [street, setStreet] = useState(null)
  const [city, setCity] = useState(null)

  const [state, setState] = useState(null)
  const [department, setDepartment] = useState(null)

  const [zipCode, setZipCode] = useState(null)

  const dispatch = useDispatch()


  /**
   * Handle form submit
   *
   * @param {Event} event
   */
  function handleSubmit(event) {
    event.preventDefault()

    const newEmployee = {
      firstName, lastName,
      startDate, birthDate: dateOfBirth,
      department, street, city, zipCode,
      state
    }

    dispatch(create(newEmployee))
    reset(event.target)
  }

  function reset(target) {
    target.reset()

    setDisplayModal(true)
    setFirstName(null)
    setLastName(null)
    setDateOfBirth('')
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
   * @param {String} type dateOfBirth | startDate
   * @throws new Error("Invalid 'type'")
   */
  function updateInputDate(newDate, type) {
    switch(type) {
      case 'dateOfBirth':
        setDateOfBirth(newDate)
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
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastname" id="lastName" onInput={ event => setLastName(event.target.value) } />
        </div>

        <div>
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="text"
            name="dateofbirth"
            id="dateOfBirth"
            value={ dateOfBirth }
            onInput={ (event) => setDateOfBirth(event.target.value) }
            onClick={ () => setActiveDateOfBirthDatePicker(activeDateOfBirthDatePicker === false) }
            autoComplete="off"
          />
          {
            activeDateOfBirthDatePicker === true
              ? <DatePicker
                  dateSelected={ dateOfBirth }
                  updateInputDate={ (newDate) => updateInputDate(newDate, 'dateOfBirth') }
              />
              : null
            }
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
        </div>

        <fieldset>
          <legend>Address</legend>

          <div>
            <label htmlFor="street">Street</label>
            <input type="text" name="street" id="street" onInput={ event => setStreet(event.target.value) } />
          </div>

          <div>
          <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" onInput={ event => setCity(event.target.value) } />
          </div>

          <div>
            <DropDown data={ stateDataFromJSON.data } callback={ (dataSelected) => setState(dataSelected) } options={ { labelName: 'State' } } />
          </div>

          <div>
            <label htmlFor="zipCode">Zip Code</label>
            <input type="number" name="zipcode" id="zipCode" onInput={ event => setZipCode(event.target.value) } />
          </div>
        </fieldset>

        <div>
          <DropDown data={ departmentDataFromJSON.data } callback={ (dataSelected) => { setDepartment(dataSelected) } } options={ { labelName:  'Department' } } />
        </div>

        <button type="submit">Save</button>
      </form>
    </>
  )
}