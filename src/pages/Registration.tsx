import React, { useContext, useEffect, useState } from 'react'
import { Formik } from 'formik'
import { InputField } from '../components/InputField'
import { useFetch } from '../hooks/useFetch'
import { ServerErrors } from '../components/ServerErrors'
import { Redirect } from 'react-router-dom'
import { actions, CurrentUserContext } from '../context/currentUser'
import { User } from '../types'
import { LOCAL_TOKEN } from '../config'
import { useLocalStorage } from '../hooks/useLocalStorage'


const initialValues = {
  email: '',
  username: '',
  password: '',
  password_confirmation: ''
}
type RegistrationFormValues = typeof initialValues

type RegistrationFormErrors = {
  email?: string
  username?: string
  password?: string
  password_confirmation?: string
}


export function Registration() {

  const { isLoading, error, data, doFetch } = useFetch<{user: User}>('/users')
  const [isSuccess, setIsSuccess] = useState(false)
  const [, setToken] = useLocalStorage(LOCAL_TOKEN)
  const [, dispatch ] = useContext(CurrentUserContext)

  const onSubmit = (values: RegistrationFormValues) => {
    if (isLoading) {
      return
    }

    const { email, username, password } = values
    doFetch({
      method: 'POST',
      data: {
        user: {
          email,
          username,
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
    dispatch(actions.authSuccess(data.user))
    setIsSuccess(true)
  }, [data, dispatch, setToken])

  const validate = ( values: RegistrationFormValues ): RegistrationFormErrors => {
    const errors: RegistrationFormErrors = { }

    if (!values.email) {
      errors.email = 'Required'
    }
    if (!values.username) {
      errors.username = 'Required'
    }
    if (!values.password) {
      errors.password = 'Required'
    }
    if (values.password !== values.password_confirmation || !values.password_confirmation) {
      errors.password_confirmation = "Passwords don't match"
    }

    return errors
  }

  if (isSuccess) {
    return <Redirect to='/' />
  }


  return(
    <div className="registration-page row">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
      {({ isSubmitting, handleSubmit }) => (
        <form className="col-md-5 mr-auto ml-auto" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="form-group">
            <label htmlFor="input-email">Email</label>
            <InputField name="email" type="email" className="form-control" id="input-email" />
          </div>
          <div className="form-group">
            <label htmlFor="input-username">Username</label>
            <InputField name="username" className="form-control" id="input-username" />
          </div>
          <div className="form-group">
            <label htmlFor="input-password">Password</label>
            <InputField name="password" type="password" className="form-control" id="input-password" />
          </div>
          <div className="form-group">
            <label htmlFor="input-password-confirmation">Password Confirmation</label>
            <InputField name="password_confirmation" type="password" className="form-control" id="input-password-confirmation" />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              { isLoading ? 'Submitting...' : 'Submit' }
            </button>
          </div>

          {error && <ServerErrors error={error} />}
        </form>
        )}
      </Formik>
    </div>
  )
}
