import React from 'react'

const TextInput = (props) => {
  const { label, name, className, ...otherProps } = props
  return (
    <div className={ `input-field ${className}` }>
      <input
        id={ name }
        name={ name }
        type="text"
        className="validate"
        { ...otherProps } />
      <label htmlFor={ name }>{ label }</label>
    </div>
  )
}

export default TextInput
