import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { CurrentUserContext } from '../context/currentUser'
import { Loader } from './Loader/Loader'


type PropsType = {
  component: any
  path: string
  exact?: boolean
}

export function ProtectedRoute({ component: WrappedComponent, path, ...rest }: PropsType) {
  const [{isLoggedIn, isLoading, isGuest}] = useContext(CurrentUserContext)
  return (
    <Route path={path} {...rest} render={
      props => {
        if (!isGuest && (isLoading === null || isLoading === true)) {
          return <Loader title="Loading user..." />
        }
        if (isLoggedIn) {
          return <WrappedComponent {...rest} {...props} />
        } else {
          return <Redirect to={{ pathname: '/login', state: { referrer: path } }} />
        }
      }
    } />
  )
}
