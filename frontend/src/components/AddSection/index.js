import React from 'react'
import {connect} from 'react-redux'

import { Button, Modal, Form, Input } from 'antd';
import * as actions from '../../actions'

const FormItem = Form.Item;

class AddSection extends React.Component {

  state = {
    isModalVisible: false
  }

  showModal = () => this.setState(() => ({ isModalVisible: true }))
  hideModal = () => this.setState(() => ({ isModalVisible: false }))

  fetchMovies = query => {
    this.props.setQuery(query)
    this.props.fetchMovies({query})
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      console.log('err', err)
      if (!err) {
        console.log('Received values of form: ', values)
        if(values.stars){
          const trimStars = star => star.trim()
          values.stars = values.stars.split(',').map(trimStars) // TODO: сделать ввод более юзер-френдли
        }
        this.props.addMovies(values)
      }
    })
    this.hideModal()
  }

  render () {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Open</Button>
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
              {getFieldDecorator('year')(<Input />)}
            </FormItem>
            <FormItem label="Format">
              {getFieldDecorator('format')(<Input />)}
            </FormItem>
            <FormItem label="Stars">
              {getFieldDecorator('stars')(<Input />)}
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
    addMovies: movieData => dispatch(actions.addMovies(movieData)),
    setQuery: query => dispatch(actions.setQuery(query))
  }
}

const enhancedForm = Form.create()(AddSection)
export default connect(null, mapDispatchToProps)(enhancedForm)
