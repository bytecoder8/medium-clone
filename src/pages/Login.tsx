import React from 'react'

export function Login() {
  return (
    <div className="login-page row">
      <form className="col-md-5 mr-auto ml-auto">
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="input-email">Email address</label>
          <input 
            type="email"
            name="email"
            className="form-control"
            id="input-email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="input-password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="input-password"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}
