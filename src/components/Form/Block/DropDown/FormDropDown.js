import DropDown from '../../../DropDown/DropDown'
import ErrorList from '../../../ErrorList/ErrorList'
import classesDropDown from '../../../../assets/themes/DropDown/DropDownTheme.module.css'
import classes from './FormDropDown.module.css'

/**
 * Component to display a Form DropDown with its errors
 *
 * @param {Object}   props
 * @param {String}   props.label
 * @param {Array}    props.data
 * @param {Object}   props.value
 * @param {Function} props.onChange
 * @param {Object}   props.mapProperties
 * @param {Array}    props.errors
 *
 * @returns <FormDropDown
 *     label={ ... }
 *     data={ [...] }
 *     value={ ... }
 *     onChange={ (value) => functionName(value) }
 *     mapProperties={ { ... } }
 *     errors={ [...] }
 * />
 */
export default function FormDropDown({ label, data, value, onChange, mapProperties, errors }) {

  return (
    <div className={ classes.containerDropdown }>
      <DropDown
        data={ data }
        currentValue={ value }
        updateValue={ (valueSelected) => onChange(valueSelected) }
        labelName={ label }
        mapProperties={ mapProperties }
        themes={ classesDropDown }
      />

      <ErrorList errors={ errors } />
    </div>
  )
}