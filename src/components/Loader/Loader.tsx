import React from 'react'


interface PropsType {
  title?: string
}

export function Loader({title}: PropsType) {
  return (
    <div className="loader">
      { title ? title : 'Loading...'}
    </div>
  )
}
