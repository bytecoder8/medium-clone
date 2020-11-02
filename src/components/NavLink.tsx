import React, { FC } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'


type NavLinkProps = {
  to: string,
  tag?: string,
  exact?: boolean
}


const NavLink: FC<NavLinkProps & RouteComponentProps> = (props) => {
  const { location, to, tag = 'li' } = props

  const className = location.pathname === to ? 'active' : ''
  const CustomTag: any = tag

  return (
    <CustomTag className={'nav-item ' + className}>
      <Link to={to} className='nav-link'>
        {props.children}
      </Link>
    </CustomTag>
  )
}

export default withRouter(NavLink)
