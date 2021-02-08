import React from 'react'
import { ServerError } from '../types'


type PropsType = {
  error: ServerError
}

export function ServerErrors({error}: PropsType) {
  if (!error) {
    return null
  }

  const { errors } = error

  if (errors && Object.keys(errors).length > 0) {
    return (
      <div className="alert alert-danger">
        <ul>
          { Object.keys(errors).map(key => (
            <li key={key}>{key}:&nbsp;
              { Array.isArray(errors[key]) ? errors[key].join(', ') : errors[key] }
            </li>
          )) }
        </ul>
      </div>
    )
  } else {
    return (
      <div className="alert alert-danger">
        { error.message }
      </div>
    )
  }
}
