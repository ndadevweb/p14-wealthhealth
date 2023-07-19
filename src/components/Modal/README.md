# React Modal

React Modal is a simple component to display a modal on a web page


## Description

This component allows to display a modal with content that can be built by the user.

It can receive 4 arguments including 2 optional

- {Boolean} **open** To show or hide the modal
- {Function} **callbackClose** To hide the modal with an interaction outside modal component
- {String} **labelButton** To change the label of the button (default value: ✖) _(Optional)_
- {Object} **themes** To change the styles of the component _(Optional)_


## How to use in the project

In your component

```
import { useState } from 'react'
import Modal from './components/Modal'

export default YourComponent() {
  const [displayModal, setDisplayModal] = useState(false)

  return (
    <>
      <Modal open={ displayModal } callbackClose={ () => setDisplayModal(false) }>
        Employee created !
      </Modal>

      <button type="button" onClick={ () => setDisplayModal(true) }>Show me !</button>
    </>
  )
}
```

## How to change style of the React Modal component

Create a Modal.module.css

Create a literal object with these properties

```
const themes = {
  customThemeOverlay: classesModal.customThemeOverlay,
  customThemeModal: classesModal.customThemeModal,
  customThemeContent: classesModal.customThemeContent,
  customThemeButtonClose: classesModal.customThemeButtonClose
}
```


Below all css classes can be override

```
.customThemeOverlay {}

.customThemeModal {}

.customThemeContent {}

.customThemeButtonClose {}
```