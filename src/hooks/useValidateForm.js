import { useState } from 'react'

/**
 * To use this hook
 *
 * Use setConfiguration and add in argument an array of object like this
 *
 * [
 *     {
 *         name: 'nameOfYourField1',
 *         rules: { required: true, minMax: [3, 10] }
 *     }
 * ]
 *
 * Here is the list of configuration you can use
 *
 * - required: true | false
 * - minMax: [5, 50]
 * - date: { format: 'MM/DD/YYYY' } or { format: 'DD/MM/YYYY' }
 * - numeric: true | false
 * - min: 5
 * - max: 20
 * - instList: [item1, item2, item3, ...]
 *
 * @returns {Object} { errors, clearErrors, setConfiguration, isValid, fieldsValidated }
 */
export function useValidateForm() {
  const [errors, setErrors] = useState({})

  const fieldsValidated = []
  const fieldsInvalidated = {}

  const fieldsConfiguration = []

  /**
   * Validators available
   * To add validator, add a new function
   * and fill this array with the reference
   * of the validator function
   */
  const validatorsAvailable = {
    required: validatorRequired,
    minMax: validatorMinMax,
    numeric: validatorNumeric,
    inList: validatorInList,
    date: validatorDate,
    min: validatorMin,
    max: validatorMax,
  }

  /**
   * Returns an error message corresponding to the validator
   *
   * @param {String} validatorName
   * @param {Array}  validatorValues
   * @param {String} fieldValue
   *
   * @returns {String}
   */
  function getErrorMessage(validatorName, validatorValues, fieldValue) {
    switch(validatorName) {
      case 'required':
        return "Is 'required' and cannot be empty"

      case 'minMax':
        const [ min, max ] = validatorValues
        return `Between '${min}' and '${max}' characters`

      case 'numeric':
        return 'Only numbers allowed'

      case 'inList':
        return `The value '${fieldValue}' is not in the list allowed`

      case 'min':
        return `At least '${validatorValues}' character(s)`

      case 'max':
        return `At most '${validatorValues}' character(s)`

      case 'date':
        return `The date format must be ${validatorValues.format}`

      default:
        return ''
    }
  }

  /**
   * Check if fieldValue is not empty when the
   * property 'required' is equal true
   *
   * @param {Boolean} validatorRuleValue
   * @param {String} fieldValue
   *
   * @returns {Boolean}
   */
  function validatorRequired(validatorRuleValue, fieldValue) {
    if(validatorRuleValue === false) {
      return true
    }

    if(validatorRuleValue === true && fieldValue.trim('') === '') {
      return false
    }

    return true
  }

  /**
   * Check if fieldValue has a value between
   * the values in validatorRuleValue array
   *
   * @param {Array} validatorRuleValue [minValue, maxValue]
   * @param {String} fieldValue
   *
   * @returns {Boolean}
   */
  function validatorMinMax(validatorRuleValue, fieldValue) {
    const fieldValueTrim = fieldValue.trim('')
    const valueLength = fieldValueTrim.length
    const [ min, max ] = validatorRuleValue

    if(valueLength >= min && valueLength <= max) {
      return true
    }

    return false
  }

  /**
   * Check if fieldValue has a valid date
   *
   * date: { format: ['MM/DD/YYYY'] }
   *
   * @param {Object} validatorRuleValue ['MM/DD/YYYY', 'DD/MM/YYYY']
   * @param {String} fieldValue
   *
   * @returns {Boolean}
   */
  function validatorDate(validatorRuleValue, fieldValue) {
    const formatAllowed = ['MM/DD/YYYY', 'DD/MM/YYYY']
    const { format } = validatorRuleValue

    if(formatAllowed.includes(format) === false) {
      return false
    }

    let locale = ''

    switch(format) {
      case 'MM/DD/YYYY':
        locale = 'en-US'
        break

      case 'DD/MM/YYYY':
        locale = 'fr-FR'
        break

      default:
        return false
    }

    const date = new Date(fieldValue)

    try {
      new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(date)

      return true
    } catch(e) {
      return false
    }
  }

  /**
   * Check if fieldValue has a numeric value
   *
   * numeric: true | false
   *
   * @param {Boolean}
   * @param {String} fieldValue
   *
   * @returns {Boolean}
   */
  function validatorNumeric(validatorRuleValue, fieldValue) {
    if(validatorRuleValue === false && /^[0-9]+$/.test(fieldValue) === true) {
      return false
    }

    if(validatorRuleValue === true && /^[0-9]+$/.test(fieldValue) === false) {
      return false
    }

    return true
  }

  /**
   * Check if fieldValue has an item includes in the list
   *
   * inList: [item1, item2, etc...]
   *
   * @param {Array}  validatorRuleValue
   * @param {String} fieldValue
   *
   * @returns {Boolean}
   */
  function validatorInList(validatorRuleValue, fieldValue) {
    if(validatorRuleValue.includes(fieldValue) === false) {
      return false
    }

    return true
  }

  /**
   * Check if fieldValue matches with min value
   *
   * @param {Number} validatorRuleValue
   * @param {Number} fieldValue
   *
   * @returns {Boolean}
   */
  function validatorMin(validatorRuleValue, fieldValue) {
    const fieldValueTrim = fieldValue.trim('')
    const valueLength = fieldValueTrim.length

    if(valueLength < validatorRuleValue) {
      return false
    }

    return true
  }

  /**
   * Check if fieldValue matches with max value
   *
   * @param {Number} validatorRuleValue
   * @param {Number} fieldValue
   *
   * @returns {Boolean}
   */
  function validatorMax(validatorRuleValue, fieldValue) {
    const fieldValueTrim = fieldValue.trim('')
    const valueLength = fieldValueTrim.length

    if(valueLength > validatorRuleValue) {
      return false
    }

    return true
  }

  /**
   * Apply each validator
   *
   * @param {Object} rules
   * @param {String} fieldName
   * @param {String} valueToCheck
   */
  function checkRulesValidity(rules, fieldName, valueToCheck) {
    const errorsList = []
    const rulesEntries = Object.entries(rules)
    const rulesLength = rulesEntries.length

    for(let index = 0; index < rulesLength; index++) {
      const [ validatorName, validatorValue ] = rulesEntries[index]
      const validatorResult = validatorsAvailable[validatorName](
        validatorValue, valueToCheck
      )

      if(validatorResult === false) {
        errorsList.push(getErrorMessage(validatorName, validatorValue, valueToCheck))
      }
    }

    if(errorsList.length > 0) {
      fieldsInvalidated[fieldName] = errorsList
    } else {
      fieldsValidated[fieldName] = valueToCheck.trim('')
    }
  }

  /**
   *
   * @param {Array} configuration
   */
  function setConfiguration(configuration = []) {
    fieldsConfiguration.push(...configuration)
  }

  function isValid(fieldsData) {
    const fieldsLength = fieldsConfiguration.length

    if(fieldsLength === 0) {
      return true
    }

    for(let indexFieldConfiguration = 0; indexFieldConfiguration < fieldsLength; indexFieldConfiguration++) {
      const { name: fieldName, rules } = fieldsConfiguration[indexFieldConfiguration]
      const valueToCheck = fieldsData[fieldName]

      checkRulesValidity(rules, fieldName, valueToCheck)
    }

    if(Object.keys(fieldsInvalidated).length > 0) {
      setErrors(fieldsInvalidated)

      return false
    }

    return true
  }

  /**
   * Remove all errors
   */
  function clearErrors() {
    setErrors({})
  }

  return {
    errors,
    clearErrors,
    setConfiguration,
    isValid,
    fieldsValidated
  }
}