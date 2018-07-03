// const initialState = {
//     "adult": false,
//     "backdrop_path": "",
//     "belongs_to_collection": null,
//     "budget": 0,
//     "genres": [],
//     "homepage": "",
//     "id": 0,
//     "imdb_id": "",
//     "original_language": "en",
//     "original_title": "",
//     "overview": "",
//     "popularity": 0,
//     "poster_path": "",
//     "production_companies": [],
//     "production_countries": [],
//     "release_date": "",
//     "revenue": 0,
//     "runtime": 0,
//     "spoken_languages": [],
//     "status": "",
//     "tagline": "",
//     "title": "",
//     "video": false,
//     "vote_average": 0,
//     "vote_count": 0
// }

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

