import { Map } from 'immutable'

const initialState = Map({
  results: null,
  currentPage: 1,
  totalResults: 0,
  query: {}
})

const moviesReducer = (state = initialState, action)=>{
  switch(action.type){
    case 'SET_MOVIES':
      return state.merge(action.payload)

    case 'SET_QUERY':
      return state.set('query', action.payload)

    default:
      return state
  }
}

export default moviesReducer

