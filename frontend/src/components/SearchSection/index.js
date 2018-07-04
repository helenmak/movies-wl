import React from 'react'
import {connect} from 'react-redux'
import { not, equals, and } from 'ramda'

import { Input, Button } from 'antd'
import * as actions from '../../actions'

class SearchSection extends React.Component {

  state = {
    title: '',
    stars: '',
    edited: false
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const state = {}
    const titleNotExists = and(not(prevState.title), not(prevState.edited))
    const starsNotExists = and(not(prevState.stars), not(prevState.edited))
    const titleNotEquals = not(equals(nextProps.query.title, prevState.title))
    const starsNotEquals = not(equals(nextProps.query.stars, prevState.stars))
    if(titleNotExists && titleNotEquals) state.title = nextProps.query.title
    if(starsNotExists && starsNotEquals) state.stars = nextProps.query.stars
    return state
  }

  inputStyle = { width: '100%', maxWidth: 500 }

  fetchMoviesByAllParams = () => {
    const { title, stars } = this.state
    this.props.fetchMovies({ title, stars })
  }
  fetchMoviesTitle = () => this.props.fetchMovies({ title: this.state.title})
  fetchMoviesStars = () => this.props.fetchMovies({ stars: this.state.stars})

  handleTitleSearchChange = event => {
    event.persist()
    this.setState(() => ({
      title: event.target.value,
      edited: true
    }))
  }
  handleStarsSearchChange = event => {
    event.persist()
    this.setState(() => ({
      stars: event.target.value,
      edited: true
    }))
  }

  render () {
    return <React.Fragment>
      <Input
        placeholder="Find by title"
        onPressEnter={this.fetchMoviesTitle}
        onChange={this.handleTitleSearchChange}
        value={this.state.title}
        style={this.inputStyle}
        addonAfter={<Button onClick={this.fetchMoviesTitle}>Find by title</Button>}
        size="large"
      />
      <Input
        placeholder="Find by star"
        onPressEnter={this.fetchMoviesStars}
        onChange={this.handleStarsSearchChange}
        value={this.state.stars}
        style={this.inputStyle}
        addonAfter={<Button onClick={this.fetchMoviesStars}>Find by star</Button>}
        size="large"
      />
      <Button size="large" onClick={this.fetchMoviesByAllParams}>Search</Button>
    </React.Fragment>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: query => dispatch(actions.fetchMovies(query))
  }
}

const mapStateToProps = state => {
  return {
    query: state.getIn(['movies', 'query'])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchSection)
