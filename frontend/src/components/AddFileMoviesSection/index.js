import React from 'react'
import {connect} from 'react-redux'
import { or, isNil, isEmpty, splitEvery, not } from 'ramda'

import { Button, Upload, Icon, Row } from 'antd';
import * as actions from '../../actions'


class AddMoviesSection extends React.Component {

  state = {
    file: null
  }

  uploadProps = {
    beforeUpload: file => {
      this.setState(() => ({ file }))
      return false
    },
    fileList: null
  }

  disableUploadButton = file => or(isNil, isEmpty)(file)

  splitText = text => {
    let delimiter = '\n'
    if(text.indexOf('\r\n')>(-1)){
      delimiter = '\r\n'
    } else if (text.indexOf('\r')>(-1)){
      delimiter = '\r'
    }
    return text.split(delimiter) //TODO: regexp
  }

  removeEmptyLines = text => {
    return text.filter(line => line.trim().length)
  }

  getLineKey = line => {
    const key = line.split(':')[0]
    return key.trim().toLowerCase()
  }

  getLineValue = line => {
    const value = line.split(':')[1]
    return value.trim()
  }

  parseLines = text => {
    let movieItems = splitEvery(4, text)
    return movieItems.reduce((arr, movie, movieIndex) => {
      if(not(arr[movieIndex])) arr[movieIndex] = {}
      movie.forEach(line => {
        if (this.getLineKey(line) === 'release year') {
          arr[movieIndex].year = Number(this.getLineValue(line))
          return
        }
        if (this.getLineKey(line) === 'stars') {
          const trimStars = star => star.trim()
          const stars = this.getLineValue(line).split(',').map(trimStars)
          arr[movieIndex].stars = stars
          return
        }
        arr[movieIndex][this.getLineKey(line)] = this.getLineValue(line)
      })
      return arr
    }, [])
  }

  handleUpload = () => {
    const file = this.state.file
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if(result.indexOf('�') > (-1)) {
        reader.readAsText(file, 'windows-1251')
        return
      }
      const rawText = this.splitText(result)
      const text = this.removeEmptyLines(rawText)
      const moviesToSend = this.parseLines(text)
      this.props.addMovies(moviesToSend)
      this.clearState()
    }
    reader.readAsText(file, 'utf-8')
  }

  clearState = () => this.setState(() => ({ file: null}))

  render () {
    return (
      <Row type="flex">
        <Upload {...this.uploadProps}>
          <Button>
            <Icon type="upload" /> Pick movies file
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={this.disableUploadButton(this.state.file)}
        >
          Upload file
        </Button>
      </Row>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMovies: moviesData => dispatch(actions.addMovies(moviesData))
  }
}

export default connect(null, mapDispatchToProps)(AddMoviesSection)
