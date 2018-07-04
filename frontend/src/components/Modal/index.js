import { Modal, Button } from 'antd'

const modalRoot = document.getElementById('modal')

export default class Modal extends React.Component {

  state = {
    isModalVisible: false
  }

  el = document.createElement('div')

  showModal = () => this.setState(() => ({ isModalVisible: true }))

  hideModal = () => this.setState(() => ({ isModalVisible: false }))

  componentDidMount() {
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

  render() {

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Open</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.isModalVisible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    )
  }
}