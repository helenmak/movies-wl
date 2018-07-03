import { Map } from 'immutable'

const initialState = Map({
  results: null,
  page: 1,
  total_pages: 0,
  total_results: 0,
  query: ''
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

