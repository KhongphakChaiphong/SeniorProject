import React, { Component } from "react";
import Problem from "../StudentFeedComp.js/ProblemDiagnosis/Problem";
import { Container, Row, Col } from "react-bootstrap";

import StudentPostList from "../StudentFeedComp.js/StudentPostComp/StudentPostList";
import StudentAddPost2 from "../StudentFeedComp.js/StudentPostComp/StudentAddPost2";
import { Redirect } from "react-router-dom";
export default class StudentFeed extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let LoggedIn = true;
    if (token === null) {
      LoggedIn = false;
    }
    this.state = {
      LoggedIn,
    };
  }
  render() {
    if (this.state.LoggedIn === false) {
      return <Redirect to="/Login" />;
    }
    console.log(localStorage.getItem("student_name"));
    console.log(localStorage.getItem("token"));
    return (
      <React.Fragment>
      <br/>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={12}>
              <StudentAddPost2 />
            </Col>
          </Row>
          <br />
          <Row className="justify-content-md-center">
            <Col>
              <Problem />
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={12}>
              <StudentPostList />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
