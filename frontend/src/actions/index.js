import * as api from '../utils/api'
import axios from 'axios'
import { ifElse, identity, concat } from 'ramda'
import { Map, fromJS } from 'immutable'

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
    dispatch(showPreloader())
    try {
      const { data } = await axios.get(api.fetchMovie(id))
      const dataToSet = Map(fromJS(data))
      dispatch(setCurrentMovie(dataToSet))
    } catch (err) {
      console.log(err)
    } finally {
      dispatch(hidePreloader())
    }
  }
}

export function addMovies(movies){
  const wrapInArray = (...args) => args
  const dataToSend = ifElse(Array.isArray, identity, wrapInArray)(movies)
  return async (dispatch, getState) => {
    dispatch(showPreloader())
    try {
      await axios.post(api.addMovies(), { movies: dataToSend })

      const query = getState().getIn(['movies', 'query'])
      const page = getState().getIn(['movies', 'currentPage'])
      dispatch(fetchMovies(query, page))
    } catch (err) {
      console.log(err)
    } finally {
      dispatch(hidePreloader())
    }
  }
}

export function deleteMovie(id){
  return async (dispatch, getState) => {
    dispatch(showPreloader())
    try {
      await axios.delete(api.deleteMovie(id))

      const query = getState().getIn(['movies', 'query'])
      const page = getState().getIn(['movies', 'currentPage'])
      dispatch(fetchMovies(query, page))
    } catch (err) {
      console.log(err)
    } finally {
      dispatch(hidePreloader())
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
