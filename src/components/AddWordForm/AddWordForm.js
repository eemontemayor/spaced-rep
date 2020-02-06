import React from 'react'
import './AddWordForm.css'

export default function AddWordForm(props) {
    const { className, ...otherProps } = props
   
    return (
      <form
        className={['AddWord-form', className].join(' ')}
        action='#'
        {...otherProps}
      />
    )
  }