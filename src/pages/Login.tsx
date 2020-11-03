import axios from 'axios'
import React, { useState } from 'react'

export function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    axios(process.env.REACT_APP_API_BASE + '/users/login', {
      method: 'POST',
      data: {
        user: {
          email,
          password
        }
      }
    })
    .then(console.log)
    .catch(console.dir)
    .finally(() => setIsSubmitting(false))
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
      </form>
    </div>
  )
}
