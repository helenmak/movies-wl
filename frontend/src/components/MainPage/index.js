import React from 'react'
import {connect} from 'react-redux'

import { Row, Col, Divider } from 'antd'
import * as actions from "../../actions"
import SearchSection from '../SearchSection'
import AddSection from '../AddSection'
import AddFileMoviesSection from '../AddFileMoviesSection'
import MoviesCards from '../MoviesCards'
import {branch} from "recompose"
import NoContent from '../NoContent'

class MainPage extends React.Component{
  state = {}

  render () {
    return (
      <React.Fragment>
        <Row type="flex" justify="space-between">
          <AddSection/>
          <AddFileMoviesSection/>
        </Row>

        <Divider/>

        <Row type="flex" justify='center'>
          <SearchSection/>
        </Row>
        <Row type="flex" justify='center'>
          <Col xs={24}>
            <ConditionalMoviesCards {...this.props}/>
          </Col>
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
    fetchMovies: () => dispatch(actions.fetchMovies())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
