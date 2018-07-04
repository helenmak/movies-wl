import React from 'react'
import {connect} from 'react-redux'
import { either, identical, flip, gt, lt } from 'ramda'

import { Button, Modal, Form, Input, Select } from 'antd';
import * as actions from '../../actions'

const FormItem = Form.Item;
const Option = Select.Option;

class AddSection extends React.Component {

  state = {
    isModalVisible: false
  }

  showModal = () => this.setState(() => ({ isModalVisible: true }))
  hideModal = () => this.setState(() => ({ isModalVisible: false }))

  renderFormatOptions = () => {
    let formats = ['VHS', 'DVD', 'Blu-Ray']
      return formats.map(format => <Option key={format}>{format}</Option>)
  }

  fetchMovies = query => {
    this.props.fetchMovies({query})
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values.stars){
          const trimStars = star => star.trim()
          values.stars = values.stars.split(',').map(trimStars)
        }
        if(values.year){
          const year = Number(values.year)
          values.year = year
        }
        this.props.addMovies(values)
        this.hideModal()
      }
    })
  }

  validateYear = (rule, value, callback) => {
    const currentYear = (new Date()).getFullYear()
    const greaterThan = flip(gt)
    const lessThan = flip(lt)
    console.log(either(greaterThan(currentYear), lessThan(1880))(Number(value)))
    const notPass = either(either(greaterThan(currentYear), lessThan(1880)), identical(NaN))
    if (notPass(Number(value))) {
      callback('Please input correct year!')
    } else {
      callback()
    }
  }

  render () {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Add Movie</Button>
        <Modal
          title="Create a new movie"
          visible={this.state.isModalVisible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
          okText="Create"
        >
          <Form layout="vertical">

            <FormItem label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of movie!' }]
                })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Release Year">
              {getFieldDecorator('year',
              { rules: [{validator: this.validateYear }]}
                )(
                  <Input />
              )}
            </FormItem>
            <FormItem label="Format">
              {getFieldDecorator('format')(
                <Select
                  style={{ width: '100%' }}
                >
                  {this.renderFormatOptions()}
                </Select>,)
              }
            </FormItem>
            <FormItem label="Stars">
              {getFieldDecorator('stars')(<Input placeholder="Separate multiple values with comma" />)}
            </FormItem>

          </Form>
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: config => dispatch(actions.fetchMovies(config)),
    addMovies: movieData => dispatch(actions.addMovies(movieData))
  }
}

const enhancedForm = Form.create()(AddSection)
export default connect(null, mapDispatchToProps)(enhancedForm)
