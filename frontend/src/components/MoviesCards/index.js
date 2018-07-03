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

  imageApi = 'https://image.tmdb.org/t/p/'

  handlePaginationChange = page => {
    const config = {page, query: this.props.query}
    this.props.fetchMovies(config)
  }

  handleMovieCardClick = movieId => this.props.goToPage(`movies/${movieId}`)

  renderIconText = (type, text) =>
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>

  renderMovieItem = movie =>
    <List.Item
      style={{minHeight: '263px'}}
      key={movie.get('title')}
      actions={[this.renderIconText("star-o", movie.get('vote_average')), this.renderIconText("like-o", movie.get('popularity')), this.renderIconText('calendar', movie.get('release_date'))]}
      extra={<img alt="no poster" src={`${this.imageApi}/w154/${movie.get('poster_path')}`} />}
      onClick ={()=>this.handleMovieCardClick(movie.get('id'))}
    >
      <List.Item.Meta
        title={movie.get('title')}
        description={movie.get('adult') && '18+'}
      />
      {movie.get('overview')}
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
    goToPage: route => dispatch(push(route))
  }
}

const mapStateToProps = state => {
  return {
    movies: state.getIn(['movies', 'results']),
    query: state.getIn(['movies', 'query']),
    currentPage: state.getIn(['movies', 'page']),
    totalResults: state.getIn(['movies', 'total_results']),
    totalPages: state.getIn(['movies', 'total_pages']),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesCards)
