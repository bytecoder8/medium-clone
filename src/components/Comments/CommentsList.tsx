import React from 'react'
import { Link } from 'react-router-dom'
import { Comment } from '../../types'
import { getUserImageUrl } from '../../utils'
import { articleDate } from '../../utils/datetime'
import styles from './CommentsList.module.css'


interface PropsType {
  comments: Comment[]
  onDelete: (comment: Comment) => void
}

export function CommentsList({comments, onDelete}: PropsType) {
  return (
    <div>
      {comments.map( comment => (
        <div className="card mb-2" key={comment.id}>
          <div className="card-body">
            <p className="card-text">{comment.body}</p>
          </div>
          <div className={"card-footer " + styles.commentFooter}>
            <Link to={`/profiles/${comment.author.username}`} className={styles.userImage}>
              <img src={getUserImageUrl(comment.author)} alt="user" />
            </Link>
            <Link to={`/profiles/${comment.author.username}`} className={styles.username}>
              {comment.author.username}
            </Link>
            <span className={styles.date}>{articleDate(comment.createdAt)}</span>
            <span onClick={() => onDelete(comment)} className={styles.deleteButton}>
              <i className="bi bi-trash"></i>
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
