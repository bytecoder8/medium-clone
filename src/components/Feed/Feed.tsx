import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CurrentUserContext } from '../../context/currentUser'
import { Article } from '../../types'
import { getUserImageUrl } from '../../utils'
import { articleDate } from '../../utils/datetime'
import { AddToFavorites } from '../AddToFavorites'
import styles from './Feed.module.css'


interface PropsType {
  articles: Article[]
}

export function Feed({articles}: PropsType) {
  const [{isLoggedIn}] = useContext(CurrentUserContext)

  return (
    <div className={styles.feed}>
      { articles.map((article, index) => (
        <div className={styles.articlePreview} key={index}>
          <div className={styles.articleMeta}>
            <Link to={`/profiles/${article.author.username}`} className={styles.userImage}>
              <img src={getUserImageUrl(article.author)} alt="user" />
            </Link>
            <div className={styles.info}>
              <Link to={`/profiles/${article.author.username}`}>
                {article.author.username}
              </Link>
              <div className={styles.date}>{articleDate(article.createdAt)}</div>
            </div>
            <div className={styles.favoriteButton}>
              <AddToFavorites
                isFavorited={article.favorited}
                favoritesCount={article.favoritesCount}
                articleSlug={article.slug}
                enabled={isLoggedIn}
              />
            </div>
          </div>
          <div className={styles.articleMain}>
            <h4 className={styles.title}>{article.title}</h4>
            <p className={styles.description}>{article.description}</p>
            <footer className={styles.footer}>
              <Link to={`/articles/${article.slug}`} className={styles.readMore}>Read More...</Link>
              <ul className={styles.tagList}>
                {article.tagList.map( tag => (
                  <li key={tag} className="badge badge-pill badge-light">{tag}</li>
                ))}
              </ul>
            </footer>
          </div>
        </div>
      )) }
    </div>
  )
}
