import { ReactNode } from 'react'
import { PopularTags } from '../PopularTags/PopularTags'


interface FeedPageLayoutProps {
  children: ReactNode
  className?: string
}
export const FeedPageLayout = ({ children, className = '' } : FeedPageLayoutProps) => {
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
