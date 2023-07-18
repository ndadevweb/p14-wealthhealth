# React DropDown

React DropDown is a simple component to display an item list, like an HTML select


## Description

This component allows you to display an item list to navigate with the keyboards, theses key can be used

- ArrowUp and ArrowDown
- PageUp and PageDown
- Home and End
- Space and Escape

It can receive 5 arguments including 3 optional

- {Array}    **data** Data to inject a list of items in the DropDown
- {Function} **updateValue** To change the parent component's state
- {String}   **labelName** Text of the label (if empty the label will be not displayed) _(Optional)_
- {Object}   **mapProperties** Map properties of the data _(Optional)_
- {Object}   **themes** Theme to custom component _(Optional)_


## How to use in the project

In your component

- **mapProperties** => An object like this { value: 'Key Representing the id', text: 'Label of the item that will be displayed' }

```
import { useState } from 'react'
import DropDown from './components/DropDown'
import classesDropDownCustomTheme from './themes/DropDownCustomTheme.module.css'

export default YourComponent() {

    const data = [
      {
        id: 1,
        fruit: 'Orange',
      },
      {
        id: 2,
        fruit: 'Strawberry',
      },
      {
        id: 3,
        fruit: 'Banana',
      },
      {
        id: 4,
        fruit: 'Peach'
      }
    ]

    const [fruit, setFruit] = useState(data[0])

    return (
      <>
        <DropDown
          data={ data }
          currentValue={ fruit }
          updateValue={ (fruitSelected) => setFruit(fruitSelected) }
          labelName={ 'What is your favorite fruit ?' }
          mapProperties={ { 'value': 'id', 'text': 'fruit'}}
          themes={ classesDropDownCustomTheme }
        />
      </>
    )
}
```

When the button has focus, you can use the keyboard keys Arrow Up, Arrow Down to move inside the list. With the Space key
it' possible to select an item, this action will close the DropDown and will update the parent component's state.
With the Page Up, Page Down, Home and End key you can select the first or the last item in the list.
With the Escape Key you can close the DropDown without selecting an item.
When the DropDown will open again, the last item selected will be highlighted



## How to change style of the React DataTable component

Create a DropDown.module.css

here is a list of selectors to override the component's default styles

```

/* Custom theme of the container containing each element */

.customThemeContainer {}

/* Custom theme of the button */

.customThemeButton {}
.customThemeButton:hover {}
.customThemeButton:focus {}

/* Custom theme of the item */

.customThemeItem {}


/* custom theme of the item highligthed */

.customThemeItem.customThemeItemActive{}


/* Custom theme of the container of the list */

.customThemeDropDownList {}

```