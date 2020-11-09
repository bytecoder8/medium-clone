import React, { useEffect } from 'react'
import { stringify } from 'query-string'
import { Feed } from '../../components/Feed/Feed'
import { Loader } from '../../components/Loader/Loader'
import { Pagination } from '../../components/Pagination/Pagination'
import { PopularTags } from '../../components/PopularTags/PopularTags'
import { ServerErrors } from '../../components/ServerErrors'
import { useFetch } from '../../hooks/useFetch'
import { ArticleResponse } from '../../types'
import { getPaginator } from '../../utils'
import { ARTICLES_PER_PAGE } from '../../config'
import { RouteComponentProps } from 'react-router-dom'


export function YourFeed({ location, match }: RouteComponentProps) {
  const { offset, currentPage } = getPaginator(location.search, ARTICLES_PER_PAGE)
  const params = stringify({
    limit: ARTICLES_PER_PAGE,
    offset
  })

  const apiUrl = `/articles/feed?${params}`
  const {
    data, isLoading, error, doFetch
  } = useFetch<ArticleResponse>(apiUrl)

  useEffect(() => {
    doFetch()
  }, [doFetch, currentPage])

  return (
    <div className="your-feed row">
      <div className="col-md-9">
        <h2>Your Feed</h2>
        {isLoading && <Loader title="Loading articles..." />}
        {error && <ServerErrors error={error} />}
        {!isLoading && data && (
          <>
            <Feed articles={data.articles} />
            <Pagination
              perPage={ARTICLES_PER_PAGE}
              total={data.articlesCount}
              currentPage={currentPage}
              url={match.url} 
            />
          </>
        )}
      </div>
      <div className="col-md-3">
        <PopularTags />
      </div>
    </div>
  )
}
