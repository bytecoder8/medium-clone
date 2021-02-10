import React from 'react'
import classNames from 'classnames'
import { useFetch } from '../../hooks/useFetch'
import { Profile } from '../../types'


interface PropsType {
  isFollowed: boolean
  username: string
}

export function FollowButton({isFollowed, username}: PropsType) {
  const apiUrl = `/profiles/${username}/follow`
  const {doFetch, data, isLoading} = useFetch<{profile: Profile}>(apiUrl)

  const isFollowedRecent = data ? data.profile.following : isFollowed

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    doFetch({
      method: isFollowedRecent ? 'DELETE' : 'POST'
    })
  }

  const classes = classNames({
    btn: true,
    'btn-sm': true,
    'btn-secondary': isFollowedRecent,
    'btn-outline-secondary': !isFollowedRecent
  })

  const verb = isFollowedRecent ? 'Unfollow' : 'Follow'
  const icon = isFollowedRecent ? 'bi bi-dash' : 'bi bi-plus'

  return (
    <button 
      className={classes}
      onClick={handleClick}
      disabled={isLoading}
    >
      <i className={icon}></i>
      <span>{ verb } {username}</span>
    </button>
  )
}
