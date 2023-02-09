import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link, Redirect, RouteComponentProps } from 'react-router-dom'
import { AddToFavorites } from '../../components/AddToFavorites'
import { Comments } from '../../components/Comments/Comments'
import { Loader } from '../../components/Loader/Loader'
import { ServerErrors } from '../../components/ServerErrors'
import { CurrentUserContext } from '../../context/currentUser'
import { useFetch } from '../../hooks/useFetch'
import { Article } from '../../types'
import { getUserImageUrl } from '../../utils'
import { articleDate } from '../../utils/datetime'
import styles from './Article.module.css'


interface ParamsType {
  slug: string
}

export const ArticlePage = ({ match }: RouteComponentProps<ParamsType>) => {
  const apiUrl = '/articles/' + match.params.slug
  const {
    data, isLoading, error, doFetch
  } = useFetch<{article: Article}>(apiUrl)

  const {
    data: dataDeletion,
    doFetch: doDeleteArticle,
    error: errorDeletion
  } = useFetch(apiUrl)
  
  const [{isLoggedIn, currentUser}] = useContext(CurrentUserContext)
  const isAuthor = () => {
    if (!data || !isLoggedIn || !currentUser) {
      return false
    }
    return data.article.author.username === currentUser.username
  }

  const [isSuccessfullDeletion, setIsSuccessfullDeletion] = useState(false)
  
  const deleteArticle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    doDeleteArticle({
      method: 'DELETE'
    })
  }

  // load article
  useEffect(() => {
    doFetch()
  }, [doFetch])

  // redirect after deletion
  useMemo(() => {
    if (!dataDeletion) {
      return
    }

    setIsSuccessfullDeletion(true)
  }, [dataDeletion])


  // Display component
  if (isSuccessfullDeletion) {
    return <Redirect to='/' />
  }

  if (isLoading) {
    return <Loader />
  }
  if (error) {
    return <ServerErrors error={error} />
  }

  if (!data) {
    return null
  }

  const { 
    title, body, tagList, author, createdAt, favorited, favoritesCount, slug
  } = data.article

  return (
    <div className={styles.articlePage}>
      <div className={styles.banner}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.meta}>
          <Link to={`/profiles/${author.username}`} className={styles.userImage}>
            <img src={getUserImageUrl(author)} alt="user" />
          </Link>
          <div className={styles.info}>
            <Link to={`/profiles/${author.username}`} className={styles.userName}>
              {author.username}
            </Link>
            <div className={styles.date}>{articleDate(createdAt)}</div>
          </div>
          { isAuthor() ? (
            <div className={styles.articleButtons}>
              <Link
                className="btn btn-outline-secondary btn-sm"
                to={`/articles/${data.article.slug}/edit`}
              >
                <i className="bi bi-pencil-fill"></i>
                &nbsp;Edit Article
              </Link>
              <button
                className="btn btn-outline-danger btn-sm ml-1"
                onClick={deleteArticle}
              >
                <i className="bi bi-trash-fill"></i>
                &nbsp;Delete Article
              </button>
            </div>
          ) : (
            isLoggedIn && (
              <div className={styles.articleButtons}>
                <AddToFavorites
                  isFavorited={favorited}
                  favoritesCount={favoritesCount}
                  articleSlug={slug}
                  text="Favorite Article"
                />
              </div>
            )
          )
        }
        </div>
      </div>

      { errorDeletion && <ServerErrors error={errorDeletion} /> }
      
      <p>{body}</p>
      
      { tagList.length > 0 &&
        <ul className={styles.tagList}>
          { tagList.map(tag => (
            <li className="badge badge-pill badge-light" key={tag}>{ tag }</li>
          )) }
        </ul>
      }
      <hr />

      { !isLoggedIn && 
        <div className="row mt-4 mb-2">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <Link to="/login">Sign in</Link> or <Link to="/register">sign up</Link> to add comments on this article.
          </div>
        </div>
      }

      <Comments articleSlug={slug} />
    </div>
  )
}
