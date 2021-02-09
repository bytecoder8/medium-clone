import qs from 'query-string'
import { User } from '../types';


export const range = (start: number, stop: number, step: number = 1) => {
  return Array.from({ length: stop - start + 1 }, (_, i) => (i + start)*step)
}

export const clamp = (number: number, min: number, max: number) => {
  return Math.max(min, Math.min(number, max));
}

export const getPaginator = (query: string, perPage: number)
: { currentPage: number, offset: number } => {

  const parsedQuery = qs.parse(query)
  const currentPage = parsedQuery.page ? Number(parsedQuery.page) : 1
  const offset = currentPage * perPage - perPage
  return {currentPage, offset}
}

export function getUserImageUrl(author: User): string {
  return author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'
}
