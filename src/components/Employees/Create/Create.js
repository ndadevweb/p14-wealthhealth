import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useValidateForm } from '../../../hooks/useValidateForm'

import { create } from '../../../features/employeesSlice'

import Modal from '../../Modal/Modal'
import { FormText, FormDatePicker, FormDropDown } from '../../Form'

import stateDataFromJSON from '../../../data/state.json'
import departmentDataFromJSON from '../../../data/department.json'

import classes from './Create.module.css'
import classesModal from '../../../assets/themes/Modal/ModalTheme.module.css'

export default function Create() {

  const [displayModal, setDisplayModal] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [birthDate, setBirthDate] = useState('')
  const [startDate, setStartDate] = useState('')

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
      rules: { required: true, numeric: true, minMax: [2, 10] }
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

  return (
    <>
      <Modal open={ displayModal } callbackClose={ () => setDisplayModal(false) } labelButton='Fermer' themes={ classesModal }>
        Employee created !
      </Modal>

      <form onSubmit={ handleSubmit } autoComplete="off" className={ classes.mainForm }>
        <fieldset>
          <legend>Personnal</legend>

          <FormText
            name="firstName"
            label="First Name"
            value={ firstName }
            onInput={ (value) => setFirstName(value) }
            errors={ errors?.firstName }
          />

          <FormText
            name="lastName"
            label="Last Name"
            value={ lastName }
            onInput={ (value) => setLastName(value) }
            errors={ errors?.lastName }
          />

          <FormDatePicker
            name="birthdate"
            label="Date of Birth"
            value={ birthDate }
            onChange={ (value) => setBirthDate(value) }
            errors={ errors?.birthDate}
          />

          <FormDatePicker
            name="startdate"
            label="Start Date"
            value={ startDate }
            onChange={ (value) => setStartDate(value) }
            errors={ errors?.startDate}
          />
        </fieldset>

        <fieldset>
          <legend>Address</legend>

          <FormText
            name="street"
            label="Street"
            value={ street }
            onInput={ (value) => setStreet(value) }
            errors={ errors?.street }
          />

          <FormText
            name="city"
            label="City"
            value={ city }
            onInput={ (value) => setCity(value) }
            errors={ errors?.city }
          />

          <FormDropDown
            label={ 'State' }
            data={ stateDataFromJSON.data }
            value={ stateCountry }
            onChange={ (stateCountrySelected) => setStateCountry(stateCountrySelected) }
            mapProperties={ { 'value': 'id', 'text': 'name'} }
            errors={ errors?.state }
          />

          <FormText
            name="zipCode"
            label="Zip Code"
            value={ zipCode }
            onInput={ (value) => setZipCode(value) }
            errors={ errors?.zipCode }
          />
        </fieldset>

        <fieldset>
          <legend>Department</legend>

          <FormDropDown
            label={ 'State' }
            data={ departmentDataFromJSON.data }
            value={ department }
            onChange={ (stateDepartmentSelected) => setDepartment(stateDepartmentSelected) }
            mapProperties={ { 'value': 'id', 'text': 'name'} }
            errors={ errors?.department }
          />
        </fieldset>

        <button type="submit" className="formBtn">Save</button>
      </form>
    </>
  )
}