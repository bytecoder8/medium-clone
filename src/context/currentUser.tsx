import React, { createContext, useState } from 'react'
import { User } from '../types'


const defaultUserState = {
  isLoading: false,
  isLoggedIn: false,
  currentUser: null as User | null
}
type CurrentUserState = typeof defaultUserState

type ContextType = [
  CurrentUserState,
  React.Dispatch<React.SetStateAction<CurrentUserState>>
]
export const CurrentUserContext = createContext<ContextType>([defaultUserState, () => {}])


interface PropTypes {
  children?: React.ReactNode
}
export const CurrentUserProvider = ({ children }: PropTypes) => {
  const [state, setState] = useState<CurrentUserState>(defaultUserState)

  return(
    <CurrentUserContext.Provider value={[state, setState]}>
      { children }
    </CurrentUserContext.Provider>
  )
}
