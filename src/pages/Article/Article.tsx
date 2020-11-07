import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Loader } from '../../components/Loader/Loader'
import { ServerErrors } from '../../components/ServerErrors'
import { useFetch } from '../../hooks/useFetch'
import { Article } from '../../types'
import styles from './Article.module.css'


interface ParamsType {
  slug: string
}

export const ArticlePage = ({ match }: RouteComponentProps<ParamsType>) => {
  const {
    data, isLoading, error, doFetch
  } = useFetch<{article: Article}>('/articles/' + match.params.slug)
  
  useEffect(() => {
    doFetch()
  }, [doFetch])

  if (isLoading) {
    return <Loader />
  }
  if (error) {
    return <ServerErrors error={error} />
  }

  if (!data) {
    return null
  }

  const { title, description, tagList } = data.article
  return (
    <div className={styles.articlePage}>
      <h3>{title}</h3>
      <p>{description}</p>
      { tagList.length > 0 &&
        <>
          Tags:
          <ul className={styles.tagList}>
            { tagList.map(tag => (
              <li className="badge badge-pill badge-light" key={tag}>{ tag }</li>
            )) }
          </ul>
        </>
      }
    </div>
  )
}
