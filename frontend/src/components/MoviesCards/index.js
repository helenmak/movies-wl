import React from 'react'
import {connect} from 'react-redux'

import { List, Icon } from 'antd'
import * as actions from '../../actions'
import { push } from 'react-router-redux'

class MoviesCards extends React.Component {
  state = {
    currentPage: 1,
    totalResults: 0
  }

  static getDerivedStateFromProps (nextProps) {
    return {
      currentPage: nextProps.currentPage,
      totalResults: nextProps.totalResults
    }
  }

  handlePaginationChange = page => {
    const config = {page, query: this.props.query}
    this.props.fetchMovies(config)
  }

  handleMovieCardClick = movieId => this.props.goToPage(`movies/${movieId}`)

  deleteMovie = (event, movieId) => {
    event.stopPropagation()
    this.props.deleteMovie(movieId)
  }

  renderIconText = (type, text) =>
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>

  renderDescription = movie => {
    return <div>
      <div>Id: {movie.get('_id')}</div>
    </div>
  }

  renderMovieItem = movie =>
    <List.Item
      style={{minHeight: '100px'}}
      key={movie.get('title')}
      extra={<div onClick={(e) => this.deleteMovie(e, movie.get('_id'))}>Delete film</div>}
      actions={[this.renderIconText('calendar', movie.get('year'))]}
      onClick ={()=>this.handleMovieCardClick(movie.get('_id'))}
    >
      <List.Item.Meta
        title={movie.get('title')}
        description={this.renderDescription(movie)}
      />
      <div>Format: {movie.get('format')}</div>
      <div>Stars: {movie.get('stars').join(", ")}</div>
    </List.Item>

  setDataSource = movies => movies ? movies.toArray() : []

  render () {
    const pagination = {
      pageSize: 20,
      current: this.state.currentPage,
      total: this.state.totalResults,
      onChange: this.handlePaginationChange
    }

    return <List
      itemLayout="vertical"
      size="large"
      pagination = {this.props.movies.first() ? pagination : false}
      dataSource={this.setDataSource(this.props.movies)}
      renderItem={this.renderMovieItem}
    />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: query => dispatch(actions.fetchMovies(query)),
    fetchCurrentMovie: id => dispatch(actions.fetchCurrentMovie(id)),
    deleteMovie: id => dispatch(actions.deleteMovie(id)),
    goToPage: route => dispatch(push(route))
  }
}

const mapStateToProps = state => {
  return {
    movies: state.getIn(['movies', 'results']),
    currentPage: state.getIn(['movies', 'currentPage']),
    totalResults: state.getIn(['movies', 'totalResults'])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesCards)
