import React from 'react'
import { Comment } from '../../types'
import { articleDate } from '../../utils/datetime'


export function CommentsList({comments}:{comments: Comment[]}) {
  return (
    <div>
      {comments.map( comment => (
        <div className="card" key={comment.id}>
          <div className="card-body">
            <p className="card-text">{comment.body}</p>
          </div>
          <div className="card-footer">
            {comment.author.username}
            <span>{articleDate(comment.createdAt)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
