import React, { createContext, useReducer } from 'react'
import { InferValueTypes, LoadingType, User } from '../types'


const initialState = {
  isLoading: null as LoadingType,
  isLoggedIn: false,
  currentUser: null as User | null,
  isGuest: false
}
type CurrentUserState = typeof initialState


// Auth reducer and actions
export const actions = {
  setAsGuest: () => ({
    type: 'SET_GUEST' as const
  }),
  loading: () => ({
    type: 'LOADING' as const
  }),
  authSuccess: (user: User) => ({
    type: 'AUTH_SUCCESS' as const,
    payload: user
  }),
  authRevoke: () => ({
    type: 'AUTH_REVOKE' as const
  }),
  authFailure: (error: string) => ({
    type: 'AUTH_FAILURE' as const,
    payload: error
  }),
  updateSuccess: (user: User) => ({
    type: 'UPDATE_USER_SUCCESS' as const,
    payload: user
  }),
}
export type AuthActionTypes = ReturnType<InferValueTypes<typeof actions>>

const authReducer = (state: CurrentUserState = initialState, action: AuthActionTypes): CurrentUserState => {
  switch (action.type) {
    case 'SET_GUEST':
      return {...state, 
        isGuest: true, 
        isLoading: null,
        isLoggedIn: false,
        currentUser: null
      }
    case 'LOADING':
      return {...state, isLoading: true}
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        currentUser: action.payload
      }
    case 'AUTH_REVOKE':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        currentUser: null
      }
    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        currentUser: action.payload
      }
    default:
      return state
  }
}

// Context
type ContextType = [
  CurrentUserState,
  React.Dispatch<AuthActionTypes>
]
export const CurrentUserContext = createContext<ContextType>([initialState, ()=>{}])
// Wrapper Component
interface PropTypes {
  children?: React.ReactNode
}
export const CurrentUserProvider = ({ children }: PropTypes) => {
  const value = useReducer(authReducer, initialState)

  return(
    <CurrentUserContext.Provider value={value}>
      { children }
    </CurrentUserContext.Provider>
  )
}
