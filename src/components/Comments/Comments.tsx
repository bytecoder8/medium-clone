import React, { useCallback, useContext, useEffect, useState } from 'react'
import { CurrentUserContext } from '../../context/currentUser'
import { useFetch } from '../../hooks/useFetch'
import { Comment } from '../../types'
import { Loader } from '../Loader/Loader'
import { ServerErrors } from '../ServerErrors'
import { CommentForm } from './CommentForm'
import { CommentsList } from './CommentsList'


export function Comments({articleSlug}: {articleSlug: string}) {
  const [{ isLoggedIn, currentUser }] = useContext(CurrentUserContext)
  const { 
    data, isLoading, error, doFetch 
  } = useFetch<{comments: Comment[]}>(`/articles/${articleSlug}/comments`)

  const [comments, setComments] = useState<Comment[]>([])

  const onCommentSaved = useCallback(
    (comment: Comment) => {
      setComments( prevState => [comment].concat(prevState))
    },
    [],
  )

  const {
    doFetch: doDeleteComment
  } = useFetch<{}>(`/articles/${articleSlug}/comments/`)

  const onDelete = (comment: Comment) => {
    doDeleteComment({
      method: 'DELETE',
      appendToUrl: comment.id.toString()
    })
    setComments( prev => prev.filter(e => e.id !== comment.id))
  }


  useEffect(() => {
    doFetch()
  }, [doFetch])

  useEffect(() => {
    if (!data) {
      return
    }

    setComments(data.comments)
  }, [data])

  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        {isLoggedIn && <CommentForm articleSlug={articleSlug} onCommentSaved={onCommentSaved} />}
        
        {isLoading && <Loader title="Loading comments" />}
        {error && <ServerErrors error={error} header="Error loading comments" /> }
        {comments && (
          <CommentsList
            comments={comments}
            onDelete={onDelete}
            username={currentUser?.username}
          />
        )}
      </div>
    </div>
  )
}
