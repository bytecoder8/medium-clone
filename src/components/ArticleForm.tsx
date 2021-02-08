import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { Article } from '../types'
import { ServerErrors } from './ServerErrors'


export function ArticleForm() {
  
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [description, setDescription] = useState('')
  const [tagList, setTagList] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [redirectSlug, setRedirectSlug] = useState('')

  const apiUrl = '/articles'
  const { data, error, doFetch } = useFetch<{article: Article}>(apiUrl)


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    doFetch({
      method: 'POST',
      data: {
        article: {
          title,
          body,
          description,
          tagList
        }
      }
    })
  }

  const parseAndSetTags = (inputTags: string) => {
    const tags = inputTags.split(/\s+/)
    setTagList(tags)
  }

  useEffect(() => {
    if (!data) {
      return
    }

    setIsSubmitting(false)
    setRedirectSlug(data.article.slug)
  }, [data])

  useEffect(() => {
    if (!error) {
      return
    }
    setIsSubmitting(false)
  }, [error])

  if (redirectSlug) {
    return <Redirect to={`/articles/${redirectSlug}`} />
  }

  return (
    <div className='article-page'>
      <form className="col-md-8 mr-auto ml-auto" onSubmit={handleSubmit}>
        <h2>Settings</h2>
        {error && <ServerErrors error={error} />}
        <div className="form-group">
          <label htmlFor="input-title">Title</label>
          <input 
            type="text"
            name="title"
            id="input-title"
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="input-description">Description</label>
          <input 
            type="description"
            name="description"
            id="input-description"
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="input-body">Body</label>
          <textarea
            name="body"
            id="input-body"
            cols={8}
            rows={6}
            className="form-control"
            value={body}
            onChange={e => setBody(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="input-tagList">Tag List</label>
          <input 
            type="text"
            name="tagList"
            id="input-tagList"
            className="form-control"
            value={tagList.join(' ')}
            onChange={e => parseAndSetTags(e.target.value)}
            placeholder="separated by space"
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-success"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}
