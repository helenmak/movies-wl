import React from 'react'
import {connect} from 'react-redux'
import {branch, renderNothing} from 'recompose'
import MovieCard from './movieCard'

import * as actions from '../../actions'

class MoviePage extends React.Component {
  componentDidMount(){
    this.props.fetchCurrentMovie(this.props.match.params.id)
  }

  componentWillUnmount(){
    this.props.clearCurrentMovie()
  }

  render () {
    return <DelayedMovieCard {...this.props}/>
  }
}

const DelayedMovieCard = branch(
  props => props.fetching,
  renderNothing,
)(MovieCard)


const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentMovie: id => dispatch(actions.fetchCurrentMovie(id)),
    clearCurrentMovie: () => dispatch(actions.clearCurrentMovie()),
  }
}

const mapStateToProps = state => {
  return {
    movie: state.get('currentMovie'),
    fetching: state.getIn(['preloader', 'show'])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage)
