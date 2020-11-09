import React, { useEffect } from 'react'
import { stringify } from 'query-string'
import { Loader } from '../../components/Loader/Loader'
import { ServerErrors } from '../../components/ServerErrors'
import { useFetch } from '../../hooks/useFetch'
import { ArticleResponse } from '../../types'
import { getPaginator } from '../../utils'
import { ARTICLES_PER_PAGE } from '../../config'
import { RouteComponentProps } from 'react-router-dom'
import { FeedToggle } from '../../components/FeedToggle/FeedToggle'
import { FeedPageLayout } from '../../components/FeedPage/FeedPageLayout'
import { FeedContent } from '../../components/FeedPage/FeedContent'


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
    <FeedPageLayout className="your-feed">
      <FeedToggle />
      {isLoading && <Loader title="Loading articles..." />}
      {error && <ServerErrors error={error} />}
      <FeedContent isLoading={isLoading} data={data} url={match.url} currentPage={currentPage} />
    </FeedPageLayout>
  )
}
