import React from 'react'
import {connect} from 'react-redux'

import { Input } from 'antd'
import * as actions from '../../actions'

const Search = Input.Search

const SearchSection = props => {

  const fetchMovies = query => {
    props.setQuery(query)
    props.fetchMovies({query})
  }

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
    fetchMovies: config => dispatch(actions.fetchMovies(config)),
    setQuery: query => dispatch(actions.setQuery(query))
  }
}

export default connect(null, mapDispatchToProps)(SearchSection)
