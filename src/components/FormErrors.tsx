import React from 'react'
import { FormErrorsType } from '../types'


type PropsType = {
  error?: FormErrorsType
}

export function FormErrors({error}: PropsType) {
  if (error && error.errors) {
    const errors = error.errors
    return (
      <div className="alert alert-danger">
        <ul>
          { Object.keys(errors).map(key => (
            <li key={key}>{key} { errors[key] }</li>
          )) }
        </ul>
      </div>
    )
  }
  return null
}
