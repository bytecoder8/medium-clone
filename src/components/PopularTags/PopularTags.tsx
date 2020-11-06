import React, { ReactNode, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { Loader } from '../Loader/Loader'
import { ServerErrors } from '../ServerErrors'
import './PopularTags.css'


export function PopularTags() {
  const { data, isLoading, error, doFetch } = useFetch<{tags: string[]}>('/tags')

  useEffect(() => {
    doFetch()
  }, [doFetch])

  let tagsElement: ReactNode = null
  if (!isLoading && data && data.tags) {
    const tags = data.tags
      .map(tag => tag.trim().replace(/[\u200B-\u200D\uFEFF]/g, '')) // remove empty characters
      .filter(tag => tag.length > 0) // remove empty tags
      .filter((tag, index, values) => values.indexOf(tag) === index) // save only unique tags
    
    tagsElement = tags.map(tag => (
      <Link key={tag} to={`/tags/${tag}`} className="tag">{tag}</Link>
    ))
  }

  if (isLoading) {
    return <Loader title="Loading tags..." />
  }

  if (error) {
    <ServerErrors error={error} />
  }

  return (
    <div className="popular-tags">
      <h3>Popular Tags</h3>
      {tagsElement}
    </div>
  )
}
