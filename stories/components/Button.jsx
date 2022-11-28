import React from 'react'

const Button = ({ children, ...otherProps }) => (
  <button className="waves-effect waves-light btn" {...otherProps}>
    {children}
  </button>
)

export default Button
