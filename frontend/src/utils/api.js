const api_key = 'a38522a416492ff277bc4d0568cd9b49'
// const api_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzg1MjJhNDE2NDkyZmYyNzdiYzRkMDU2OGNkOWI0OSIsInN1YiI6IjVhYzNlYWZmOTI1MTQxMjcxMjAzZDQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._fq5EsSjarHi6qh2k2x6JTh2WBAFASsUQKmEmlg5ENo'
const api = 'https://api.themoviedb.org/3'

export const searchMovie = (query, page) => `${api}/search/movie?api_key=${api_key}&query=${query}&page=${page}`
export const fetchGenres = () => `${api}/genre/movie/list?api_key=${api_key}`
export const fetchMovie = id => `${api}/movie/${id}?api_key=${api_key}`
