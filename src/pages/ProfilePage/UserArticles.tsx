import { stringify } from 'query-string'
import React, { useEffect } from 'react'
import { FeedContent } from '../../components/FeedPage/FeedContent'
import { Loader } from '../../components/Loader/Loader'
import { ServerErrors } from '../../components/ServerErrors'
import { ARTICLES_PER_PAGE } from '../../config'
import { useFetch } from '../../hooks/useFetch'
import { ArticleResponse } from '../../types'
import { getPaginator } from '../../utils'


const getApiUrl = (username: string, isFavorites: boolean, offset: number): string => {
  const params = isFavorites
  ? { limit: ARTICLES_PER_PAGE, offset, favorited: username }
  : { limit: ARTICLES_PER_PAGE, offset, author: username}
  return `/articles?${stringify(params)}`
}


interface PropsType {
  username: string
  isFavorites: boolean
  url: string
  query: string
}

export function UserArticles({ username, isFavorites, url, query } : PropsType) {
  const { offset, currentPage } = getPaginator(query, ARTICLES_PER_PAGE)
  
  const apiUrl = getApiUrl(username, isFavorites, offset)
  const {
    data, isLoading, error, doFetch
  } = useFetch<ArticleResponse>(apiUrl)


  useEffect(() => {
    doFetch()
  }, [doFetch, isFavorites])

  return (
    <>
      {isLoading && <Loader title="Loading articles..." />}
      {error && <ServerErrors error={error} />}

      <FeedContent isLoading={isLoading} data={data} url={url} currentPage={currentPage} />
    </>
  )
}
