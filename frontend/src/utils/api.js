const api = 'http://localhost:5000'

export const addMovies = () => `${api}/movies`
export const deleteMovie = id => `${api}/movies/${id}`
export const fetchMovie = id => `${api}/movies/${id}`
export const searchMovies = ({title, stars}, page) => `${api}/search/?title=${title}&stars=${stars}&page=${page}`
