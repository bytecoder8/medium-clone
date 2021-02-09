import React from 'react'
import classNames from 'classnames'
import { useFetch } from '../hooks/useFetch'
import { Article } from '../types'


interface PropsType {
  isFavorited: boolean
  favoritesCount: number
  articleSlug: string
  text?: string
}

export function AddToFavorites({isFavorited, favoritesCount, articleSlug, text}: PropsType) {
  const apiUrl = `/articles/${articleSlug}/favorite`
  const {doFetch, data, isLoading} = useFetch<{article: Article}>(apiUrl)

  const favoritesCountRecent = data ? data.article.favoritesCount : favoritesCount
  const isFavoritedRecent = data ? data.article.favorited : isFavorited

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    doFetch({
      method: isFavoritedRecent ? 'DELETE' : 'POST'
    })
  }

  const classes = classNames({
    btn: true,
    'btn-sm': true,
    'btn-primary': isFavoritedRecent,
    'btn-outline-primary': !isFavoritedRecent
  })

  const htmlText = text ? ` ${text} (${favoritesCountRecent})` : ` ${favoritesCountRecent}`

  return (
    <button 
      className={classes}
      onClick={handleClick}
      disabled={isLoading}
    >
      <i className="bi bi-heart"></i>
      <span>{ htmlText }</span>
    </button>
  )
}
