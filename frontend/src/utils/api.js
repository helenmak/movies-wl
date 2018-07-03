const api = 'http://localhost:5000'

const checkTitleFilter = filter => {
  if(filter) return `?title=${filter}`
  return ''
}
const checkStarsFilter = filter => {
  if(filter) return `&stars=${filter}`
  return ''
}
const checkPageFilter = filter => {
  if(filter) return `&page=${filter}`
  return ''
}

export const addMovies = () => `${api}/movies`
export const deleteMovie = id => `${api}/movies/${id}`
export const fetchMovie = id => `${api}/movies/${id}`
export const searchMovies = ({title, stars}, page) => `${api}/search/${checkTitleFilter(title)}${checkStarsFilter(stars)}${checkPageFilter(page)}`
