import React, { Component } from "react";
import {
  Button,
  Modal,
  Card,
  Accordion,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import axios from "axios";

import "./scrollbar.css";
import SelectCategory from "./SelectCategory";
import SelectProblem from "./SelectProblem";

export default class StudentAddPost2 extends Component {
  constructor(props) {
    super(props);

    this.setShowModal = this.setShowModal.bind(this);
    this.setCloseModal = this.setCloseModal.bind(this);
    this.onChange_data = this.onChange_data.bind(this);
    this.onChange_category = this.onChange_category.bind(this);
    this.onChange_Problem = this.onChange_Problem.bind(this);
    //this.onChange_location=this.onChange_location.bind(this)
    this.onSubmit = this.onSubmit.bind(this);
    this.TestSubmit = this.TestSubmit.bind(this);
    this.state = {
      showModal: false,
      name: "",
      HN: "",
      Age: 0,
      Category: "",
      Problem: "",
      Examination: "",
      Problem_list: "",
      Diagnosis: "",
      Discussion: "",

      nameError: "",
      HNerror: "",
      AgeError: "",
      ProblemError: "",
      CategoryError: "",
      ExaminationError: "",
      Problem_listError: "",
      DiagnosisError: "",
      DiscussionError: "",
      //Location:""
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
  onChange_data = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onChange_category(e) {
    this.setState({
      Category: e.target.value,
    });
  }
  // onChange_location(e){
  //   this.setState({
  //     Location:e.target.value
  //   })
  // }
  onChange_Problem(e) {
    this.setState({
      Problem: e.target.value,
    });
  }
  validate = () => {
    let nameError = "";
    let HNerror = "";
    let AgeError = "";
    let ProblemError = "";
    let CategoryError="";
    let ExaminationError= "";
    let Problem_listError= "";
    let DiagnosisError= "";
    let DiscussionError= "";
    if (!this.state.name) {
      nameError = "Name must not be empty";
    }
    if (!this.state.HN) {
      HNerror = "HN must not be empty";
    }
    if (!this.state.Age) {
      AgeError = "Age must not be empty";
    }
    if (!this.state.Problem) {
      ProblemError = "You must select a symptom";
    }
    if (!this.state.Category) {
      CategoryError = "You must select a category";
    }
    if (!this.state.Examination) {
      ExaminationError = "Examination must not be empty ";
    }
    if (!this.state.Problem_list) {
      Problem_listError = "Problem List must not be empty ";
    }
    if (!this.state.Diagnosis) {
      DiagnosisError = "Diagnosis must not be empty ";
    }
    if (!this.state.Discussion) {
      DiscussionError = "Dissusion must not be empty ";
    }

    if (nameError || HNerror || AgeError || ProblemError || CategoryError || ExaminationError||Problem_listError||DiscussionError||DiagnosisError) {
      this.setState({ nameError, HNerror, AgeError, ProblemError,CategoryError,ExaminationError,DiagnosisError,Problem_listError,DiscussionError });
      return false;
    }
    return true;
  };

  TestSubmit(e) {
    e.preventDefault();
  }
  onSubmit(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);

      console.log(`Form submitted`);
      console.log(`Patient name: ${this.state.name}`);
      console.log(`HN: ${this.state.HN}`);
      console.log(`Age: ${this.state.Age}`);
      console.log(`Category: ${this.state.Category}`);
      console.log(`problem: ${this.state.Problem}`);
      console.log(`Examination: ${this.state.Examination}`);
      console.log(`Diagnosis: ${this.state.Diagnosis}`);
      console.log(`Disscussion: ${this.state.Discussion}`);
      //console.log(`Location: ${this.state.Location}`);
      const newPost = {
        PatientProfile: {
          name: this.state.name,
          HN: this.state.HN,
          Age: this.state.Age,
        },
        Category: this.state.Category,
        Problem: this.state.Problem,
        Examination: this.state.Examination,
        Problem_list: this.state.Problem_list,
        Diagnosis: this.state.Diagnosis,
        Discussion: this.state.Discussion,
        //Location:this.state.Location
      };

      let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      };
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: localStorage.getItem("token"),
      // },

      const url = "https://medical-express.herokuapp.com/api/post/create";
      //ตอนแรกเอา newPost ไปใส่ไว้ที่เดียวกับ header เลยโกโก้ครันช์
      axios
        .post(url, newPost, axiosConfig)
        .then((res) => {
          console.log(res.data)
          window.location.reload();
        })
        .catch(function (error) {
          if (error.response.status === 400) {
            console.log(error.response.data);
          } else {
            console.log(error.response.data);
          }
        });

      //พอกด submit ให้ค่าในtext เป็นค่าดังนี้
      this.setState({
        //student_id: "",
        name: "",
        HN: "",
        Age: 0,
        Category: "",
        Problem: "",
        Examination: "",
        Problem_list: "",
        Diagnosis: "",
        Discussion: "",
        nameError: "",
        HNerror: "",
        AgeError: "",
        ProblemError: "",
        DiscussionError:""
      });

      this.setCloseModal();
    }
  }

  render() {
    return (
      <React.Fragment>
        <Modal show={this.state.showModal} onHide={this.setCloseModal}>
          <Modal.Header>Create Case</Modal.Header>
          <Form onSubmit={this.onSubmit}>
            <Modal.Body>
              <Accordion defaultActiveKey="-1">
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      Patient Profile
                        <div style={{ color: "red",textAlign:"left" }}>
                          <div >{this.state.nameError}</div>
                          <div >{this.state.HNerror}</div>
                          <div >{this.state.AgeError}</div>
                        </div>
                      </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <Form.Group>
                        <Form.Label>Patient Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter patient's name"
                          name="name"
                          onChange={this.onChange_data}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>HN</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter patient's HN"
                          name="HN"
                          onChange={this.onChange_data}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter patient's age"
                          name="Age"
                          onChange={this.onChange_data}
                        />
                      </Form.Group>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <br/>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                      Select Categories&Symptoms
                      <div style={{ color: "red",textAlign:"left" }}>
                        <div >{this.state.ProblemError}</div>
                        <div >{this.state.CategoryError}</div>
                      </div>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <Form.Group>
                        <SelectCategory
                          dataCat={this.state.Category}
                          onChange={this.onChange_category}
                        />
                      </Form.Group>
                      <Form.Group>
                   
                        <SelectProblem
                          dataProb={this.state.Problem}
                          onChange={this.onChange_Problem}
                        />
                     
                      </Form.Group>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <br/>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                      Physical Examination
                    
                        <div style={{ color: "red",textAlign:"left" }}>{this.state.ExaminationError}</div>
                      
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>
                      <Form.Group>
                        <Form.Label>Physical Examination</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="5"
                          name="Examination"
                          onChange={this.onChange_data}
                        />
                      </Form.Group>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <br/>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="3">
                      Problem List&Diagnosis
                      <div style={{ color: "red",textAlign:"left" }}>
                      <div >{this.state.Problem_listError}</div>
                      <div >{this.state.DiagnosisError}</div>
                    </div>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="3">
                    <Card.Body>
                      <div>
                        <Form.Group>
                          <Form.Label>Problem List</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows="5"
                            name="Problem_list"
                            onChange={this.onChange_data}
                          />
                        </Form.Group>
                      </div>
                      <div>
                        <Form.Group>
                          <Form.Label>Differential Diagnosis</Form.Label>
                          
                          <Form.Control
                            as="textarea"
                            rows="5"
                            name="Diagnosis"
                            onChange={this.onChange_data}
                          />
                        </Form.Group>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <br/>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="4">
                      Disscussion
                      <div style={{ color: "red",textAlign:"left" }}>{this.state.DiscussionError}</div>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="4">
                    <Card.Body>
                      <div>
                        <Form.Group>
                          <Form.Label>Discussion</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows="5"
                            name="Discussion"
                            onChange={this.onChange_data}
                          />
                        </Form.Group>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Modal.Body>

            <Modal.Footer>
              <div className="form-group">
                <input
                  type="submit"
                  value="Add Post"
                  className="btn btn-primary"
                ></input>
              </div>
            </Modal.Footer>
          </Form>
        </Modal>

        <Card>
          <Card.Body>
            <Row>
              <Col xs sm md lg="10">
                <Card.Text>Do you want to write some post?</Card.Text>
              </Col>
              <Col xs sm md lg="2">
                <Button
                  width="100%"
                  variant="success"
                  onClick={this.setShowModal}
                >
                  Create Post
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

// <Form.Group>
// <SelectLocation
//   dataLoc={this.state.Location}
//   onChange={this.onChange_location}
// />
// </Form.Group>
