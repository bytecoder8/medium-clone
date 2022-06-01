import React, { useState } from 'react'
import { ArticleFormType, ServerError } from '../types'
import { ServerErrors } from './ServerErrors'


interface PropsType {
  initialValues: ArticleFormType
  onSubmit: (article: ArticleFormType) => void
  error: ServerError | undefined
  isSubmitting: boolean
  title?: string
}


export function ArticleForm({
  initialValues, 
  onSubmit, 
  isSubmitting, 
  error,
  title: htmlTitle
}: PropsType) {

  const [title, setTitle] = useState(initialValues.title)
  const [body, setBody] = useState(initialValues.body)
  const [description, setDescription] = useState(initialValues.description)
  const [tagList, setTagList] = useState<string[]>(initialValues.tagList)


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit({
      title,
      description,
      body,
      tagList
    })
  }

  const parseAndSetTags = (inputTags: string) => {
    const tags = inputTags.split(/\s+/)
    setTagList(tags)
  }


  return (
    <div className='article-page'>
      <form className="col-md-8 mr-auto ml-auto" onSubmit={handleSubmit}>
        <h2>{ htmlTitle ? htmlTitle : 'Article Form' }</h2>
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
