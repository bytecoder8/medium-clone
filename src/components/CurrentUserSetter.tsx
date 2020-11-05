import React, { FC, useContext, useEffect } from 'react'
import { LOCAL_TOKEN } from '../config'
import { CurrentUserContext } from '../context/currentUser'
import { useFetch } from '../hooks/useFetch'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { User } from '../types'

// Gets information about current user from the server using 
// the token from localstorage
export const CurrentUserSetter:FC = ({children}) => {
  const { data, doFetch } = useFetch<{user: User}>('/user')
  const [, setCurrentUserState] = useContext(CurrentUserContext)
  const [token] = useLocalStorage(LOCAL_TOKEN)

  // on init
  useEffect(() => {
    if (!token) {
      return
    }

    doFetch()
    setCurrentUserState(state => ({
      ...state,
      isLoading: true
    }))
  }, [doFetch, setCurrentUserState, token])

  useEffect(() => {
    if (!data) {
      return
    }
    setCurrentUserState(state => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: data.user
    }))
  }, [data, setCurrentUserState])

  return <>{children}</>
}
