import React from 'react'
import { PopularTags } from '../PopularTags/PopularTags'


export const FeedPageLayout:React.FC<{className?: string}> = ({ children, className = '' }) => {
  return (
    <div className={'row ' + className}>
      <div className="col-md-9">
        {children}
      </div>
      <div className="col-md-3">
        <PopularTags />
      </div>
    </div>
  )
}
