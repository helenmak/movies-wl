import * as api from '../utils/api'
import axios from 'axios'
import { ifElse, identity } from 'ramda'
import { Map, fromJS } from 'immutable'
import { message } from 'antd'

export function showPreloader(){
  return {
    type: 'SHOW_PRELOADER',
  }
}

export function hidePreloader(){
  return {
    type: 'HIDE_PRELOADER',
  }
}

export function setQuery(query){
  return {
    type: 'SET_QUERY',
    payload: query
  }
}

export function fetchMovies(query, page){
  return async dispatch => {
    dispatch(showPreloader())
    try {
      const { data } = await axios.get(api.searchMovies(query, page))
      const dataToSet = Map(fromJS(data))
      dispatch(setMovies(dataToSet))
      dispatch(setQuery(query))
    } catch (err) {
      console.log(err)
      message.error('Failed to fetch movies', 3)
    } finally {
      dispatch(hidePreloader())
    }
  }
}

export function setMovies(data){
  return {
    type: 'SET_MOVIES',
    payload: data
  }
}

export function fetchCurrentMovie(id){
  return async dispatch => {
    try {
      const { data } = await axios.get(api.fetchMovie(id))
      const dataToSet = Map(fromJS(data))
      dispatch(setCurrentMovie(dataToSet))
    } catch (err) {
      console.log(err)
      message.error('Failed to fetch movie details', 3)
    }
  }
}

export function addMovies(movies){
  const wrapInArray = (...args) => args
  const dataToSend = ifElse(Array.isArray, identity, wrapInArray)(movies)
  const messageText = Array.isArray(movies) ? 'movies' : 'movie'
  return async (dispatch, getState) => {
    try {
      await axios.post(api.addMovies(), { movies: dataToSend })
      const query = getState().getIn(['movies', 'query'])
      const page = getState().getIn(['movies', 'currentPage'])
      dispatch(fetchMovies(query, page))
      message.success(`New ${messageText} added`, 3)
    } catch (err) {
      console.log(err)
      message.error(`Failed to add ${messageText}`, 3)
    }
  }
}

export function deleteMovie(id){
  return async (dispatch, getState) => {
    try {
      await axios.delete(api.deleteMovie(id))
      const query = getState().getIn(['movies', 'query'])
      const page = getState().getIn(['movies', 'currentPage'])
      dispatch(fetchMovies(query, page))
      message.success('Movie was deleted', 3)
    } catch (err) {
      console.log(err)
      message.error('Failed to delete movie', 3)
    }
  }
}

export function setCurrentMovie(data){
  return {
    type: 'SET_CURRENT_MOVIE',
    payload: data
  }
}

export function clearCurrentMovie(){
  return {
    type: 'CLEAR_CURRENT_MOVIE'
  }
}
