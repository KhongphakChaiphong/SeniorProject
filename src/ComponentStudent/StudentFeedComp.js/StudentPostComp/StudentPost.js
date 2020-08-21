import React, { Component } from "react";
import { Card, Badge, Button, Modal } from "react-bootstrap";
import StudentPostComment from "./StudentPostComment";
import axios from "axios";
import ModalHeader from "react-bootstrap/ModalHeader";
import { Link } from "react-router-dom";
export default class StudentPost extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      user: [],
      showModal: false,
      showModal2: false,
    };
  }
  openModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }
  closeModal() {
    this.setState({
      showModal: false,
    });
  }
  delete() {
    axios
      .delete(
        "https://medical-express.herokuapp.com/api/post/delete/?_id=" +
          this.props.data._id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      // .then(window.location.href = "/CRUDuser")
      .then( () => {
          window.location.reload()
          console.log("delete")
        
        })
      .catch((err) => console.log(err));
  }
  componentDidMount() {
    axios
      .get("https://medical-express.herokuapp.com/api/user/all")
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {
    const stu_id = localStorage.getItem("stu_id");

    return (
      <React.Fragment>
  
        {this.props.data.student_id === stu_id ? (
          <React.Fragment>
            <Card>
              <Card.Header style={{ textAlign: "left" }}>
                {localStorage.getItem("student_name")}
                <Card.Text style={{ textAlign: "left" }}>
                  {this.props.data.currentTime}
                </Card.Text>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <Card.Text style={{ textAlign: "left" }}>
                    {this.props.data.Disscussion}
                  </Card.Text>
                  <div className="container">
                    <div className="row">
                      <div className="col-xs-4 col-sm-6 col-md-6 col-lg-6">
                        <Card>
                          <Card.Header>
                            Information
                            <Link
                              to={"/StudentPostEdit/" + this.props.data._id}
                            >
                              <Button variant="warning">Edit</Button>
                            </Link>
                            <Button
                              onClick={() =>
                                this.setState({ showModal2: true })
                              }
                              variant="danger"
                            >
                              Delete
                            </Button>
                          </Card.Header>
                          <Card.Body>
                            <Card.Text style={{ textAlign: "left" }}>
                              Status:{" "}
                              {this.props.data.approval ? (
                                <Badge variant="success">Approved</Badge>
                              ) : (
                                <Badge variant="danger">Unapproved</Badge>
                              )}
                            </Card.Text>
                            <p>Name:  
                            <text style={{textAlign: "left",fontWeight: "normal",}} >
                                "{this.props.data.PatientProfile.name}"
                              </text>
                            </p>
                            <p>HN:  
                            <text style={{textAlign: "left",fontWeight: "normal",}} >
                                "{this.props.data.PatientProfile.HN}"
                              </text>
                            </p>
                            <p>Age:  
                            <text style={{textAlign: "left",fontWeight: "normal",}} >
                                "{this.props.data.PatientProfile.Age}"
                              </text>
                            </p>
                            <p>Problem:  
                            <text style={{textAlign: "left",fontWeight: "normal",}} >
                                "{this.props.data.Problem.name}"
                              </text>
                            </p>
                            <p>Category:  
                            <text style={{textAlign: "left",fontWeight: "normal",}} >
                                "{this.props.data.Category.CategoryName}"
                              </text>
                            </p>
                            <p>ProblemList:  
                            <text style={{textAlign: "left",fontWeight: "normal",}} >
                                "{this.props.data.Problem_list}"
                              </text>
                            </p>
                            <p> Differential Diagnosis:  
                            <text style={{textAlign: "left",fontWeight: "normal",}} >
                                "{this.props.data.Diagnosis}"
                              </text>
                            </p>
                            <p> Disscussion:  
                            <text style={{textAlign: "left",fontWeight: "normal",}} >
                                "{this.props.data.Discussion}"
                              </text>
                            </p>
                          </Card.Body>
                        </Card>
                      </div>
                      <div className="col-xs-4 col-sm-6 col-md-6 col-lg-6">
                        <Card>
                          <Card.Header>comment</Card.Header>
                          <Card.Body>
                            <Card.Text style={{ textAlign: "left" }}>
                              {this.props.data.comment.map((comment) => (
                                <Card key={comment._id}>
                                  <Card.Body>
                                    {this.state.user.map((users) => (
                                      <React.Fragment>
                                        {users._id === comment.commenter &&
                                        users.role === "advisor" ? (
                                          <p>
                                            Aj. {users.advisorInfo.advisor_name}:
                                          </p>
                                        ) : null}
                                        {users._id === comment.commenter &&
                                        users.role === "student" ? (
                                          <p>
                                            {users.studentInfo.student_name}:
                                          </p>
                                        ) : null}
                                      </React.Fragment>
                                    ))}

                                    <text style={{fontWeight:"normal"}}>"{comment.detail}"</text>
                                  </Card.Body>
                                </Card>
                              ))}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                    <br />
                    <div>
                      <StudentPostComment postID={this.props.data._id} />
                    </div>
                  </div>
                </Card.Title>
              </Card.Body>
            </Card>
            <br />
          </React.Fragment>
        ) : null}

        {/*    <StudentPostEdit
          showModal={this.state.showModal}
          openModal={this.openModal}
          closeModal={this.closeModal}
          postID={this.props.data._id}
    />*/}

        <Modal
          show={this.state.showModal2}
          onHide={() => this.setState({ showModal2: false })}
        >
          <ModalHeader>Are you sure to delete it</ModalHeader>
          <Modal.Body>
            <Button variant="danger" onClick={this.delete}>
              yes
            </Button>
            <Button
              variant="success"
              onClick={() => this.setState({ showModal2: false })}
            >
              no
            </Button>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}
