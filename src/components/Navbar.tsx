import React from 'react'
import { Link } from 'react-router-dom'
import NavLink from './NavLink'


export const Navbar = () => {
  const isLogged = false

  const links = [
    {
      title: 'Global Feed',
      to: '/',
      isProtected: false
    },
    {
      title: 'Sign In',
      to: '/login',
      isProtected: false
    },
    {
      title: 'Sign Up',
      to: '/register',
      isProtected: false
    },
  ]

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-3">
      <Link to="/" className="navbar-brand">Home</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav ml-auto">
          { links.map( ({to, title, isProtected}) => (
            (isProtected === isLogged) && <NavLink to={to} key={title}>{title}</NavLink>
          ))}
        </ul>
      </div>
    </nav>
  )
}
