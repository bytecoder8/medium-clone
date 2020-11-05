import React, { FC, useContext, useEffect } from 'react'
import { LOCAL_TOKEN } from '../config'
import { actions, CurrentUserContext } from '../context/currentUser'
import { useFetch } from '../hooks/useFetch'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { User } from '../types'

// Gets information about current user from the server using 
// the token from localstorage
export const CurrentUserSetter:FC = ({children}) => {
  const { data, doFetch } = useFetch<{user: User}>('/user')
  const [, dispatch] = useContext(CurrentUserContext)
  const [token] = useLocalStorage(LOCAL_TOKEN)

  // on init
  useEffect(() => {
    if (!token) {
      return
    }

    doFetch()
    dispatch(actions.loading())
  }, [doFetch, token, dispatch])

  useEffect(() => {
    if (!data) {
      return
    }
    dispatch(actions.authSuccess(data.user))
  }, [data, dispatch])

  return <>{children}</>
}
