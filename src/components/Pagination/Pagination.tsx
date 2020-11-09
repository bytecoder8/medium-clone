import React from 'react'
import classnames from 'classnames'
import { clamp, range } from '../../utils'
import { Link, NavLink } from 'react-router-dom'


interface PropsType {
  perPage: number
  total: number
  currentPage: number
  url: string // current url
}

export function Pagination({ total, perPage, currentPage, url } : PropsType) {
  const count = Math.floor(total / perPage)
  
  const pagesVisible = 2 * 2
  let startPage = clamp(currentPage - pagesVisible, 1, count)
  let endPage = clamp(currentPage + pagesVisible, 1, count)
  const pages = range(startPage, endPage)
  
  const prevButton = <PaginationButton
    url={url}
    title="Previous"
    page={clamp(currentPage - 1, 1, count)}
    active={currentPage > 1}
  />
  const nextButton = <PaginationButton
    url={url}
    title="Next"
    page={clamp(currentPage + 1, 1, count)}
    active={currentPage < count}
  />

  return (
    <ul className="pagination">
      { prevButton }
      { pages.map(page => (
        <PaginationItem
          page={page}
          currentPage={currentPage}
          url={url}
          key={page}
        />
      )) }
      { nextButton }
    </ul>
  )
}

interface ItemPropsType {
  page: number
  currentPage: number
  url: string
}

function PaginationItem({ page, currentPage, url }: ItemPropsType) {
  const classes = classnames({
    'page-item': true,
    'active': page === currentPage
  })
  const urlWithPage = `${url}?page=${page}`

  return(
    <li className={classes} key={page}>
      <NavLink to={urlWithPage} className="page-link">{page}</NavLink>
    </li>
  )
}

interface ButtonPropsType {
  title: string
  url: string
  page: number
  active?: boolean
}
function PaginationButton({ title, url, page, active = true }: ButtonPropsType) {
  const classes = classnames({
    'page-item': true,
    disabled: !active
  })

  const urlWithPage = `${url}?page=${page}`
  return(
    <li className={classes}>
      { active
        ? <Link to={urlWithPage} className="page-link">{title}</Link>
        : <span className="page-link">{title}</span>
      }
    </li>
  )
}