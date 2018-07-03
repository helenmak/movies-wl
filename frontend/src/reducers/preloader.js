import { Map } from 'immutable'

const initialState = Map({
  show: false
})

const preloaderReducer = (state = initialState, action)=>{
  switch(action.type){
    case 'SHOW_PRELOADER':
      return state.set('show', true)

    case 'HIDE_PRELOADER':
      return state.set('show', false)

    default:
      return state
  }
}

export default preloaderReducer

