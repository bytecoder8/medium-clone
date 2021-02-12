import React, { useContext } from 'react'
import { LOCAL_TOKEN } from '../config'
import { actions, CurrentUserContext } from '../context/currentUser'


interface PropsType {
  classes?: string
}

export function Logout({classes}: PropsType) {
  const [, dispatch] = useContext(CurrentUserContext)

  
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    localStorage.removeItem(LOCAL_TOKEN)
    dispatch(actions.authRevoke())
  }

  return(
    <a href="#logout" className={classes} onClick={onClick}>Logout</a>
  )
}
