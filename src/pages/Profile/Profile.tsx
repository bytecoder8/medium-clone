import React, { useContext, useEffect } from 'react'
import { Link, NavLink, RouteComponentProps } from 'react-router-dom'
import { Loader } from '../../components/Loader/Loader'
import { ServerErrors } from '../../components/ServerErrors'
import { CurrentUserContext } from '../../context/currentUser'
import { useFetch } from '../../hooks/useFetch'
import { User } from '../../types'
import { getUserImageUrl } from '../../utils'
import { UserArticles } from './UserArticles'
import styles from './Profile.module.css'


interface ParamsType {
  slug: string
}

export function Profile({ location, match }: RouteComponentProps<ParamsType>) {
  const { slug } = match.params
  const isFavorites = location.pathname.includes('favorites')
  const apiUrl = `/profiles/${slug}`

  const {data, error, isLoading, doFetch } = useFetch<{profile: User}>(apiUrl)
  const [ { currentUser } ] = useContext(CurrentUserContext)

  useEffect(() => {
    doFetch()
  }, [doFetch, apiUrl])


  if (isLoading) {
    return <Loader title="Loading user's profile" />
  }

  if (error) {
    return <ServerErrors error={error} />
  }

  if (!data) {
    return null
  }

  const { profile } = data
  const isOwnProfile = profile.username === currentUser?.username

  return (
    <div className={styles.profilePage}>
      <div className={"row " + styles.userInfo}>
        <div className="col-xs-12 col-md-10 offset-md-1">
          <img src={getUserImageUrl(profile)} className={styles.userImage} alt="user"/>
          <h4>{ profile.username }</h4>
          { isOwnProfile ? 
          (
            <Link to="/settings" className="btn btn-outline-secondary btn-sm float-right">
              <i className="bi bi-gear"></i>&nbsp;Edit Profile Settings
            </Link>
          ) : (
            <button className="btn btn-outline-secondary btn-sm float-right">
              <i className="bi bi-plus"></i>&nbsp;Unfollow
            </button>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-10 offset-md-1">
          <ul className={"nav nav-pills outline-active " + styles.toggles}>
            <li className={styles.item}>
              <NavLink to={`/profiles/${profile.username}`} activeClassName={styles.active} exact>
                My Articles
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to={`/profiles/${profile.username}/favorites`} activeClassName={styles.active}>
                Favorited Articles
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.articles}>
        <UserArticles
          username={profile.username}
          isFavorites={isFavorites}
          query={location.search}
          url={match.url}
        />
      </div>
    </div>
  )
}
