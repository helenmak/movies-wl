import React from 'react'
import {connect} from 'react-redux'

import { Input } from 'antd'
import * as actions from '../../actions'

const Search = Input.Search

const SearchSection = props => {

  const fetchMovies = title => props.fetchMovies({ title })

  return <Search
    placeholder="your movie"
    onSearch={fetchMovies}
    style={{ width: 500 }}
    enterButton="Search"
    size="large"
  />
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: query => dispatch(actions.fetchMovies(query))
  }
}

export default connect(null, mapDispatchToProps)(SearchSection)
