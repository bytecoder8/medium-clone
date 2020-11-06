import React from 'react'
import { Link } from 'react-router-dom'
import { Article } from '../../types'
import { articleDate } from '../../utils/datetime'
import './Feed.css'


interface PropsType {
  articles: Article[]
}

export function Feed({articles}: PropsType) {
  return (
    <div className="feed">
      { articles.map((article, index) => (
        <div className="article-preview" key={index}>
          <div className="article-meta">
            <Link to={`/profiles/${article.author.username}`} className="user-image">
              <img src="https://static.productionready.io/images/smiley-cyrus.jpg" alt="user" />
            </Link>
            <div className="info">
              <Link to={`/profiles/${article.author.username}`}>
                {article.author.username}
              </Link>
              <div className="date">{articleDate(article.createdAt)}</div>
            </div>
          </div>
          <div className="article-main">
            <h4 className="title">{article.title}</h4>
            <p className="description">{article.description}</p>
            <footer className="footer">
              <Link to={`/articles/${article.slug}`} className="read-more">Read More...</Link>
              <ul className="tag-list">
                {article.tagList.map( tag => (
                  <li key={tag} className="tag">{tag}</li>
                ))}
              </ul>
            </footer>
          </div>
        </div>
      )) }
    </div>
  )
}
