import React, { createContext, useReducer } from 'react'
import { InferValueTypes, User } from '../types'


const initialState = {
  isLoading: false,
  isLoggedIn: false,
  currentUser: null as User | null
}
type CurrentUserState = typeof initialState


// Auth reducer and actions
export const actions = {
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
  })
}
export type AuthActionTypes = ReturnType<InferValueTypes<typeof actions>>

const authReducer = (state: CurrentUserState = initialState, action: AuthActionTypes): CurrentUserState => {
  switch (action.type) {
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
