import React, { useEffect } from 'react'
import { Feed } from '../../components/Feed/Feed'
import { ServerErrors } from '../../components/ServerErrors'
import { useFetch } from '../../hooks/useFetch'
import { Article } from '../../types'


export function GlobalFeed() {
  const {data, isLoading, error, doFetch} = useFetch<{articles: Article[]}>('/articles?limit=15&offset=0')

  useEffect(() => {
    doFetch()
  }, [doFetch])

  return (
    <div className="global-feed row">
      <div className="col-md-9">
        <h2>Global Feed</h2>
        {isLoading && <>Loading articles...</>}
        {error && <ServerErrors error={error} />}
        {!isLoading && data && (
          <Feed articles={data.articles}></Feed>
        )}
      </div>
      <div className="col-md-3">Popular tags</div>
    </div>
  )
}
