import React, { useEffect } from 'react'
import { Feed } from '../../components/Feed'
import { ServerErrors } from '../../components/ServerErrors'
import { useFetch } from '../../hooks/useFetch'
import { Article } from '../../types'


export function GlobalFeed() {
  const {data, isLoading, error, doFetch} = useFetch<{articles: Article[]}>('/articles?limit=15&offset=0')

  useEffect(() => {
    doFetch()
  }, [doFetch])

  return (
    <div className="global-feed">
      {isLoading && <div>Loading posts...</div>}
      {error && <ServerErrors error={error} />}
      {!isLoading && data && (
        <Feed articles={data.articles}></Feed>
      )}
    </div>
  )
}
