import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { ServerErrors } from '../components/ServerErrors'
import { LOCAL_TOKEN } from '../config'
import { actions, CurrentUserContext } from '../context/currentUser'
import { useFetch } from '../hooks/useFetch'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { User } from '../types'


export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const { 
    isLoading: isSubmitting, error, doFetch, data
  } = useFetch<{user: User}>('/users/login')
  const [, setToken] = useLocalStorage(LOCAL_TOKEN)
  const [, dispatch ] = useContext(CurrentUserContext)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) {
      return
    }
    doFetch({ 
      method: 'POST',
      data: {
        user: {
          email,
          password
        }
      }
    })
  }

  useEffect(() => {
    if (!data) {
      return
    }
    setToken(data.user.token)
    setIsSuccess(true)
    dispatch(actions.authSuccess(data.user))
  }, [data, setToken, dispatch])

  if (isSuccess) {
    return <Redirect to='/' />
  }
  
  return (
    <div className="login-page row">
      <form className="col-md-5 mr-auto ml-auto" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="input-email">Email address</label>
          <input 
            type="email"
            name="email"
            id="input-email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="input-password">Password</label>
          <input
            type="password"
            name="password"
            id="input-password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Submit'}
          </button>
        </div>
        {error && <ServerErrors error={error} />}
      </form>
    </div>
  )
}
