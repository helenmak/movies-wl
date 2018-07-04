import { not, isNil, isEmpty, either } from 'ramda'
const api = 'http://localhost:5000'

const checkFilter = filter => not(either(isNil, isEmpty)(filter))

export const addMovies = () => `${api}/movies`
export const deleteMovie = id => `${api}/movies/${id}`
export const fetchMovie = id => `${api}/movies/${id}`
export const searchMovies = ({title, stars}, page) => {
  const filters=[]
  if (checkFilter(title)) filters.push(`title=${title}`)
  if (checkFilter(stars)) filters.push(`stars=${stars}`)
  if (checkFilter(page)) filters.push(`page=${page}`)
  if (filters.length === 0) return `${api}/search`
  if (filters.length > 0) return `${api}/search/?${filters.join('&')}`
}
