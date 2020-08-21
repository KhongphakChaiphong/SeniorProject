import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import LogoutModal from "../../Login/LogoutModal";
import { FaSignInAlt,FaUserGraduate,FaUserTie } from "react-icons/fa";

export default class NavAdmin extends Component {
  constructor(props) {
    super(props);
    this.Nav_Change = this.Nav_Change.bind(this);
  }

  Nav_Change() {
    if (localStorage.getItem("role") === "student") {
      return (
        <div>
          <Navbar.Brand href="/StudentFeed">StudentFeed </Navbar.Brand>
          <Navbar.Brand href="/StudentProfile">
            {localStorage.getItem("student_name")} <FaUserGraduate/>
          </Navbar.Brand>
        </div>
      );
    } else if (localStorage.getItem("role") === "advisor") {
      return (
        <div>
          
          <Navbar.Brand href="/AdvisorFeed">
            Aj. {localStorage.getItem("advisor_name")} <FaUserTie/>
          </Navbar.Brand>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <Navbar className="justify-content-end navbg"
          style={{
            backgroundColor: "#0B6623" , marginBottom: '20px'}}
          variant="dark"
        >
        <Navbar.Brand style={{marginRight:'auto'}}><img style={{width:64,height:64, borderRadius:"50%", border:"2px solid #0B6623"}} src="https://firebasestorage.googleapis.com/v0/b/pingsupernuxt.appspot.com/o/Untitled%20Diagram%20(1).jpg?alt=media&token=7af213ce-97bd-4dc6-a5cd-40df77910b0b"/>MedicalLogBook</Navbar.Brand>
          {localStorage.getItem("token") === null ? (
            <Navbar.Brand href="/Login">Login <FaSignInAlt/></Navbar.Brand>
          ) : null}
          {this.Nav_Change()}

          <Nav className="mr-right">
            {localStorage.getItem("token") !== null ? <LogoutModal /> : null}
          </Nav>
        </Navbar>
      </div>
    );
  }
}

// {localStorage.getItem("role") === "student" ? (
//   <Navbar.Brand href="/StudentFeed">Feed</Navbar.Brand>
// ) : (
//   <Navbar.Brand href="/AdvisorFeed">Feed</Navbar.Brand>
// )}
