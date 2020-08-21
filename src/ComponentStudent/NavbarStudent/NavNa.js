import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
export default class NavNa extends Component {
  render() {
    return (
      <div>
        <Navbar className="justify-content-end" bg="primary" variant="dark">
          <Navbar.Brand href="/">Students</Navbar.Brand>
          <Nav className="mr-right">
            <Nav.Link href="/StudentProfile">Profile</Nav.Link>
            <Nav.Link href="">Log-out</Nav.Link>
          </Nav>
        </Navbar>
        <br/>
      </div>
    );
  }
}
