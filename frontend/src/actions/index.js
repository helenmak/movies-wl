import * as api from '../utils/api'
import axios from 'axios'
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

export function fetchGenres(){
  return async dispatch => {
    try {
      const { data } = await axios.get(api.fetchGenres())
      const dataToSet = Map(fromJS(data))
      dispatch(setGenres(dataToSet))
    } catch (err) {
      console.log(err)
    }
  }
}

export function setGenres(genres){
  return {
    type: 'SET_GENRES',
    payload: genres
  }
}

export function fetchMovies({query = '', page = 1}){
  return async dispatch => {
    dispatch(showPreloader())
    try {
      const { data } = await axios.get(api.searchMovie(query, page))
      const dataToSet = Map(fromJS(data))
      dispatch(setMovies(dataToSet))
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
