import React from 'react'
import { Link } from 'react-router-dom'
import { Article } from '../types'


interface PropsType {
  articles: Article[]
}

export function Feed({articles}: PropsType) {
  return (
    <div className="feed">
      { articles.map((article, index) => (
        <div className="article-preview" key={index}>
          <div className="article-meta">
            <Link to={`/profiles/${article.author.username}`}>
              {article.author.username}
            </Link>
            <span className="date">{article.createdAt}</span>
            <Link to={`/articles/${article.slug}`}>
              <h4>{article.title}</h4>
              <p>{article.description}</p>
              <span>Read More...</span>
              <ul className="tag-list">
                {article.tagList.map( tag => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </Link>
          </div>
        </div>
      )) }
    </div>
  )
}
