import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { CurrentUserContext } from '../../context/currentUser'
import styles from './FeedToggle.module.css'


interface PropsType {
  tag?: string
}

export function FeedToggle({ tag } : PropsType) {
  const [{ isLoggedIn }] = useContext(CurrentUserContext)

  return (
    <ul className={styles.feedToggle}>
      { isLoggedIn && (
        <li className={styles.item}>
          <NavLink to='/feed' activeClassName={styles.active}>Your feed</NavLink>
        </li>
      ) }
      <li className={styles.item}>
        <NavLink to='/' exact activeClassName={styles.active}>Global Feed</NavLink>
      </li>
      {tag && (
        <li className={styles.item}>
          <NavLink to={`/tags/${tag}`} activeClassName={styles.active}>#{tag}</NavLink>
        </li>
      )}
    </ul>
  )
}

