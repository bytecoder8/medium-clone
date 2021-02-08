import React, { useContext, useEffect, useState } from 'react'
import { ServerErrors } from '../../components/ServerErrors'
import { CurrentUserContext, actions } from '../../context/currentUser'
import { useFetch } from '../../hooks/useFetch'
import { User } from '../../types'


export const Settings = () => {
  const [currentUserState, dispatch] = useContext(CurrentUserContext)
  const apiUrl = '/user'
  const {data, error, doFetch} = useFetch<{user: User}>(apiUrl)


  const [image, setImage] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [password, setPassword] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsSubmitting(true)
    doFetch({
      method: 'PUT',
      data: {
        ...currentUserState.currentUser,
        image,
        username,
        bio,
        email,
        password
      }
    })
  }


  useEffect(() => {
    if (!currentUserState.currentUser) {
      return
    }

    const currentUser = currentUserState.currentUser
    currentUser.image && setImage(currentUser.image)
    setUsername(currentUser.username)
    setEmail(currentUser.email)
    currentUser.bio && setBio(currentUser.bio)
  }, [currentUserState.currentUser])

  // after updating user, update context
  useEffect(() => {
    if (!data) {
      return
    }

    dispatch(actions.updateSuccess(data.user))
    setIsSubmitting(false)
  }, [data, dispatch])


  return (
    <div className='settings-page'>
      <form className="col-md-5 mr-auto ml-auto" onSubmit={handleSubmit}>
        <h2>Settings</h2>
        {error && <ServerErrors error={error} />}
        <div className="form-group">
          <label htmlFor="input-image">Profile image URL</label>
          <input 
            type="text"
            name="image"
            id="input-image"
            className="form-control"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="input-username">Username</label>
          <input 
            type="text"
            name="username"
            id="input-username"
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="input-email">Email</label>
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
          <label htmlFor="input-bio">Bio</label>
          <textarea
            name="bio"
            id="input-bio"
            cols={8}
            rows={6}
            className="form-control"
            value={bio}
            onChange={e => setBio(e.target.value)}
          ></textarea>
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
            className="btn btn-success"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  )
}
