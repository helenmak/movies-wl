import { Map } from 'immutable'

const initialState = Map({})

const genresReducer = (state = initialState, action)=>{
  switch(action.type){
    case 'SET_GENRES':
      return state.merge(action.payload)

    default:
      return state
  }
}

export default genresReducer

