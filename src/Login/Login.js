import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import '.././App.css'
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handle_change = this.handle_change.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.OpenModal = this.OpenModal.bind(this);
    this.CloseModal = this.CloseModal.bind(this);

    const token = localStorage.getItem("token");
    let LoggedIn = true;
    if (token === null) {
      LoggedIn = false;
    }
    this.state = {
      userData: [],
      username: "",
      password: "",
      LoggedIn: false,
      showModal: false,
      
    };
  }
  OpenModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }
  CloseModal() {
    this.setState({
      showModal: false,
    });
  }
  handle_change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
    const { username, password } = this.state;

    axios
      .post("https://medical-express.herokuapp.com/api/user/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("name", response.data.data.user.username);
        localStorage.setItem("role", response.data.data.user.role);
        localStorage.setItem("user_id", response.data.data.user._id);
        localStorage.setItem(
          "student_name",
          response.data.data.user.studentInfo.student_name
        );
        localStorage.setItem(
          "student_id",
          response.data.data.user.studentInfo.student_id
        );
        localStorage.setItem(
          "advisor_name",
          response.data.data.user.advisorInfo.advisor_name
        );

        localStorage.setItem("stu_id", response.data.data.user._id);
        this.setState({
          userData: response.data.data.user,
          LoggedIn: true,
          
        });
        console.log("Successfully Loggin", response);
        console.log("LoggedIn: " + this.state.LoggedIn);
        console.log("token: " + response.data.data.token);
        console.log(this.state.userData._id);
      })
      .catch((error) => {
        this.OpenModal();
        console.log("login error", error);
      });
    e.preventDefault();
  }

  render() {
    
    if (this.state.LoggedIn) {
      if (this.state.userData.role === "student") {
        return {
         
        }((window.location.href = "/StudentFeed"));
      } else {
        return {
          /*<Redirect to={{ pathname: "/StudentFeed" }} /> */
        }((window.location.href = "/AdvisorFeed"));
      }
    }

    return (
      <React.Fragment>
      <div className="login-form">
          <h1>
            <span className="font-weight-bold">MedicalLogbook.com</span>
          </h1>
          <h2 className="text-center">Welcome</h2>
          <Form.Group>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  name="username"
                  value={this.state.username}
                  onChange={this.handle_change}
                  type="text"
                  placeholder="Enter Username"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  value={this.state.password}
                  onChange={this.handle_change}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Button className="btn-lg btn-primary btn-block"  type="submit">
                Login
              </Button>
              <Link to="/">
                <div className="text-center pt-3">Or continue with Admin role(for developer version) </div>
              </Link>
            </Form>
          </Form.Group>
          </div>
         
       
        <Modal show={this.state.showModal} onHide={this.CloseModal}>
          <Modal.Header>
            <h3>I think something wrong!</h3>
          </Modal.Header>
          <Modal.Body>
            <p>May be your user or password are incorrect</p>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" onClick={this.CloseModal}>
              Try again
            </button>
          </Modal.Footer>
        </Modal>

      </React.Fragment>
    );
  }
}
