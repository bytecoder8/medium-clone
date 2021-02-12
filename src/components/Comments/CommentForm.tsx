import React, { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { Comment } from '../../types'
import { ServerErrors } from '../ServerErrors'


interface PropsType {
  articleSlug: string
  onCommentSaved: (comment: Comment) => void
}

export function CommentForm({ articleSlug, onCommentSaved }: PropsType) {
  const apiUrl = `/articles/${articleSlug}/comments`
  const { data, error, doFetch } = useFetch<{comment: Comment}>(apiUrl)
  const [body, setBody] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    setIsSubmitting(true)
    doFetch({
      method: 'POST',
      data: {
        comment: { body }
      }
    })
  }


  useEffect(() => {
    if (!data) {
      return
    }

    setIsSubmitting(false)
    onCommentSaved(data.comment)
  }, [data, onCommentSaved])

  useEffect(() => {
    if (!error) {
      return
    }
    setIsSubmitting(false)
  }, [error])

  
  return (
    <form method="post" onSubmit={handleSubmit}>
      { error && <ServerErrors error={error} />}
      <div className="form-group">
        <textarea
          name="body"
          id="input-body"
          cols={8}
          rows={6}
          className="form-control"
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Write your comment..."
        ></textarea>
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
  )
}
