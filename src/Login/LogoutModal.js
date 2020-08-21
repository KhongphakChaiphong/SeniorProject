import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
export default class LogoutModal extends Component {
  constructor(props) {
    super(props);
    this.setShowModal = this.setShowModal.bind(this);
    this.setCloseModal = this.setCloseModal.bind(this);
    this.setLogout = this.setLogout.bind(this);
    this.state = {
      showModal: false,
      Log_out: false,
    };
  }
  setShowModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }
  setCloseModal() {
    this.setState({
      showModal: false,
    });
  }
  setLogout() {
    this.setState({
      Log_out: true,
    });
  }

  render() {
    console.log("Log_out: " + this.state.Log_out);
    console.log("showModal: " + this.state.showModal);
    if (this.state.Log_out) {
      return (
        localStorage.clear
        (window.location.href = "/Login")
      );
    }
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.setCloseModal}>
          <Modal.Header>Are you sure to log-out</Modal.Header>
          <Modal.Body>
            <Button onClick={this.setLogout}>Yes</Button>
            <Button onClick={this.setCloseModal}>No</Button>
          </Modal.Body>
        </Modal>
        <Button onClick={this.setShowModal}>Logout <FaSignOutAlt/></Button>
      </div>
    );
  }
}

//<Redirect to="/StudentFeed" />

// <h1>You have been logout</h1>
// <Link to="/Login">Wanna Login again</Link>
