import React from 'react'

const map = {
  small: 's',
  medium: 'm',
  large: 'l',
  extra: 'x',
}

const Col = ({ children, small, medium, large, extra }) => {
  let className = 'col'
  className += small ? ` s${small}` : ''
  className += medium ? ` m${medium}` : ''
  className += large ? ` l${large}` : ''
  className += extra ? ` x${extra}` : ''
  return (
    <div className={ className }>
      { children }
    </div>
  )
}

export default Col
