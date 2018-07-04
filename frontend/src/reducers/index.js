import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux-immutable'

import movies from './movies'
import currentMovie from './movie'
import preloader from "./preloader"

const reducers = combineReducers({
  movies,
  currentMovie,
  preloader,
  router: routerReducer
})

export default reducers;
