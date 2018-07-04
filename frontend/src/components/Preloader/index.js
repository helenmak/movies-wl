import React from 'react';
import {connect} from 'react-redux'

import style from './style.css';

const Preloader = props => {

  const renderPreloader = isShown =>
    isShown &&
    <div className = "modalPreloader">
      <div className = "preloader"></div>
    </div>

  return (
    <React.Fragment>
      {renderPreloader(props.preloader)}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    preloader: state.getIn(['preloader', 'show'])
  }
}

export default connect(mapStateToProps)(Preloader)
