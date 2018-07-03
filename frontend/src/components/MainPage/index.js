import React from 'react'
import {connect} from 'react-redux'

import { Row } from 'antd'
import * as actions from "../../actions"
import SearchSection from '../SearchSection'
import MoviesCards from '../MoviesCards'
import {branch} from "recompose"
import NoContent from '../NoContent'

class MainPage extends React.Component{
  state = {}

  componentDidMount() {
    this.props.fetchGenres()
  }

  render () {
    return (
      <React.Fragment>
          <Row type="flex" justify='center'>
            <SearchSection/>
          </Row>
          <Row type="flex" justify='center'>
            <ConditionalMoviesCards {...this.props}/>
          </Row>
      </React.Fragment>
    )
  }
}

const renderNoContent = props => props => <NoContent message={'Start search here'} />

const ConditionalMoviesCards = branch(
  props => !props.movies,
  renderNoContent
)(MoviesCards)

const mapStateToProps = state => {
  return {
    movies: state.getIn(['movies', 'results']),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchGenres: () => dispatch(actions.fetchGenres())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
