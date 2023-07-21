import ErrorList from '../../../ErrorList/ErrorList'

/**
 * Component to display Form text with its errors
 *
 * @param {Object}   props
 * @param {String}   props.name
 * @param {String}   props.label
 * @param {Function} props.onInput
 * @param {String}   props.value
 * @param {Array}    props.errors
 *
 * @returns <Text name={ ... } label={ ... } onInput={ () => ... } value={ ... } errors={ [...] } />
 */
export default function FormText({ name, label, onInput, value, errors }) {

  return (
    <div>
      <label htmlFor={ name }>{ label }</label>

      <input
        type="text"
        name={ name }
        id={ name }
        className="inputText"
        onInput={ event => onInput(event.target.value) }
        value={ value }
      />

      <ErrorList errors={ errors } />
    </div>
  )
}