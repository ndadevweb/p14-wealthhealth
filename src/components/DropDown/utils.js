/**
 * Return an array containing allowed keys
 * to interact with the dropdown when is closed
 *
 * @returns {Array}
 */
export function allowedKeysWhenClosed() {
  return [
    'ArrowUp', 'ArrowDown',
    'Home', 'End',
    'PageUp', 'PageDown',
    'Space'
  ]
}

/**
 * Return an array containing allowed keys
 * to interact with the dropdown when is open
 *
 * @returns {Array}
 */
export function allowedKeysWhenOpen() {
  return [
    'ArrowUp', 'ArrowDown',
    'Home', 'End',
    'PageUp', 'PageDown',
    'Space', 'Escape'
  ]
}

/**
 *
 * @param {Array}  data
 * @param {Number} currentValue
 * @param {String} keyCode ArrowUp | ArrowDown | Home | PageUp | End | PageDown | Escape | Space
 * @param {Object} mapProperties { 'id': 'id' }
 *
 * @returns {Number}
 */
export function getIndexDataByKeyCode(data, currentValue, keyCode, mapProperties) {
  const mapPropertyValue = mapProperties['value']

  if(keyCode === 'ArrowUp') {
    const currentIndex = data.findIndex(currentData => currentData[mapPropertyValue] === currentValue[mapPropertyValue])
    const newIndex = currentIndex === 0
      ? 0
      : currentIndex - 1

    return newIndex
  }

  if(keyCode === 'ArrowDown') {
    const currentIndex = data.findIndex(currentData => currentData[mapPropertyValue] === currentValue[mapPropertyValue])
    const newIndex = data.length - 1 === currentIndex
      ? currentIndex
      : currentIndex + 1

    return newIndex
  }

  if(['Home', 'PageUp'].includes(keyCode) === true) {
    return 0
  }

  if(['End', 'PageDown'].includes(keyCode) === true) {
    return data.length - 1
  }

  if(['Escape', 'Escape'].includes(keyCode)) {
    const currentIndex = data.findIndex(currentData => currentData[mapPropertyValue] === currentValue[mapPropertyValue])

    return currentIndex
  }
}

/**
 * Return a list of css classes to custom a component
 *
 * @param {Object} themes An object themes with custom classes
 * @param {Array} componentClasses component default css classes
 * @param {String} classNameToAdd name of the class use to override
 *
 * @returns {String}
 */
export function customTheme(themes, componentClasses, classNameToAdd) {
  const classesList = [...componentClasses]

  if(themes?.[classNameToAdd] !== undefined) {
    classesList.push(themes[classNameToAdd])
  }

  return classesList.join(' ')
}