import React, { Component } from "react";
import { Card, Image, Modal, Button, Badge } from "react-bootstrap";
import AdvisorStudentPostComment from "./AdvisorStudentPostComment";
import axios from "axios";
import { FaCheckSquare } from "react-icons/fa";
export default class AdvisorStudentPostList extends Component {
  constructor(props) {
    super(props);
    this.onClick_approve = this.onClick_approve.bind(this);
    this.OpenModal = this.OpenModal.bind(this);
    this.CloseModal = this.CloseModal.bind(this);
    this.state = {
      user: [],
      approval: true,
      showModal: false,
    };
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
  OpenModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
    console.log(this.state.showModal);
    console.log(this.state.showModal);
  }
  CloseModal() {
    this.setState({
      showModal: false,
    });
  }
  onClick_approve() {
    this.setState({
      approval: true,
    });
    console.log("approval: " + this.state.approval);
    const Approval = {
      approval: this.state.approval,
    };

    axios
      .put(
        "https://medical-express.herokuapp.com/api/post/approval/?_id=" +
          this.props.data._id,
        Approval,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => console.log(res.data));
      this.CloseModal()
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <Card.Header style={{ textAlign: "left" }}>
            <p>Poster: {this.props.data.poster} </p>
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
                  <div className="col-xs-10 col-sm-6 col-md-6 col-lg-6">
                  <Card>
                  <Card.Header>
                    Information
                    {this.props.data.approval === false ? (
                      <React.Fragment>
                        <Button onClick={this.OpenModal}>
                          Approve this case! <FaCheckSquare/>
                        </Button>
                      </React.Fragment>
                    ) : null}
                  </Card.Header>
                  <Card.Body>
                    <Card.Text style={{ textAlign: "left" }}>
                      Status: 
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
                  <div className="col-xs-2 col-sm-6 col-md-6 col-lg-6">
                   

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
                <React.Fragment>
                  <AdvisorStudentPostComment postID={this.props.data._id} />
                  {/*<StudentPostComment postID={this.props.data._id} />*/}
                </React.Fragment>
              </div>
            </Card.Title>
          </Card.Body>
        </Card>

        <Modal show={this.state.showModal} onHide={this.CloseModal}>
          <Modal.Header>Approve this case?</Modal.Header>
          <Modal.Body>
            <Button onClick={this.onClick_approve}>Approve this case</Button>
            
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.CloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
        <br />
      </React.Fragment>
    );
  }
}
