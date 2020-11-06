import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CurrentUserContext } from '../context/currentUser'
import NavLink from './NavLink'


interface LinkType {
  title: React.ReactNode
  to: string
  isGuest?: boolean
  isProtected?: boolean
}

export const Navbar = () => {
  const [{isLoggedIn, isLoading, currentUser}] = useContext(CurrentUserContext)

  const userImage = !isLoading && currentUser && currentUser.image 
    ? <img className="" src={currentUser.image} alt="profile" />
    : null

  let links: LinkType[] = [
    {
      title: 'Sign In',
      to: '/login',
      isGuest: true
    },
    {
      title: 'Sign Up',
      to: '/register',
      isGuest: true
    },
    {
      title: 'New Post',
      to: '/posts/create',
      isProtected: true
    },
    {
      title: userImage ? userImage : 'Profile',
      to: '/profile',
      isProtected: true
    }
  ]

  links = links.filter(link => {
    if (isLoggedIn && link.isGuest) {
      return false
    }
    if (!isLoggedIn && link.isProtected) {
      return false
    }
    return true
  })

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-3">
      <Link to="/" className="navbar-brand">Home</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav ml-auto">
          { links.map( ({to, title}, index) => (
            <NavLink to={to} key={index}>{title}</NavLink>
          ))}
        </ul>
      </div>
    </nav>
  )
}
