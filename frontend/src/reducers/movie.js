import { Map } from "immutable";

const initialState = Map({})

const movieReducer = (state = initialState, action)=>{

  switch(action.type){
    case 'SET_CURRENT_MOVIE':
      return state.merge(action.payload)

    case 'CLEAR_CURRENT_MOVIE':
      return state.clear()

    default:
      return state
  }
}

export default movieReducer

