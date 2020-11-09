import React from 'react'
import { ARTICLES_PER_PAGE } from '../../config'
import { ArticleResponse } from '../../types'
import { Feed } from '../Feed/Feed'
import { Pagination } from '../Pagination/Pagination'


interface PropsType {
  isLoading: boolean
  data?: ArticleResponse
  currentPage: number
  url: string
}

export function FeedContent({ isLoading, data, url, currentPage }: PropsType) {
  
  if (isLoading) {
    return null
  }

  if (data && data.articlesCount > 0) {
    return (
      <>
        <Feed articles={data.articles} />
        <Pagination
          perPage={ARTICLES_PER_PAGE}
          total={data.articlesCount}
          currentPage={currentPage}
          url={url} 
        />
      </>
    )
  }
  return <>No articles yet</>
}
