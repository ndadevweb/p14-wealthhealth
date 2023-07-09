  /**
   * Style of the overlay container
   *
   * @param {Object} An object themes with custom classes
   * @param {Object} component default css classes
   *
   * @returns {String}
   */
  export function themeOverlay(themes, cssClasses) {
    const classesList = [cssClasses.overlay]

    if(themes?.customThemeOverlay !== undefined) {
      classesList.push(themes.customThemeOverlay)
    }

    return classesList.join(' ')
  }

  /**
   * Style of the modal container
   *
   * @param {Object} An object themes with custom classes
   * @param {Object} component default css classes
   *
   * @returns {String}
   */
  export function themeModal(themes, cssClasses) {
    const classesList = [cssClasses.modal]

    if(themes?.customThemeModal !== undefined) {
      classesList.push(themes.customThemeModal)
    }

    return classesList.join(' ')
  }

  /**
   * Style of the modal's button
   *
   * @param {Object} An object themes with custom classes
   * @param {Object} component default css classes
   *
   * @returns {String}
   */
  export function themeButtonClose(themes, cssClasses) {
    const classesList = [cssClasses.buttonClose]

    if(themes?.customThemeButtonClose !== undefined) {
      classesList.push(themes.customThemeButtonClose)
    }

    return classesList.join(' ')
  }

  /**
   * Style of the modal's content
   *
   * @param {Object} An object themes with custom classes
   * @param {Object} component default css classes
   *
   * @returns {String}
   */
  export function themeContent(themes, cssClasses) {
    const classesList = [cssClasses.content]

    if(themes?.customThemeContent !== undefined) {
      classesList.push(themes.customThemeContent)
    }

    return classesList.join(' ')
  }