import React, { Component } from "react";
import axios from "axios";
import { Button, Card, Accordion, Form } from "react-bootstrap";
export default class StudentPostEdit extends Component {
  constructor(props) {
    super(props);
    this.onChange_data = this.onChange_data.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      name: "",
      HN: "",
      Age: "",
      Category: "",
      Problem: "",
      Examination: "",
      Problem_list: "",
      Diagnosis: "",
      Discussion: "",
      location: "",
    };
  }
  onChange_data = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    axios
      .get(
        "https://medical-express.herokuapp.com/api/post/?_id=" +
          this.props.match.params.id
      )
      .then((response) => {
        console.log(response)
        this.setState({
          name: response.data.data.PatientProfile.name,
          HN: response.data.data.PatientProfile.HN,
          Age: response.data.data.PatientProfile.Age,
          Examination: response.data.data.Examination,
          Problem_list: response.data.data.Problem_list,
          Diagnosis: response.data.data.Diagnosis,
          Discussion: response.data.data.Discussion,
          location: response.data.data.location,
        });
      })
      .catch(function (error) {
        console.log(error.response.status);
      });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(`Form submitted`);
    //console.log(`student_id: ${this.state.student_id}`);
    console.log(`Patient name: ${this.state.name}`);
    console.log(`HN: ${this.state.HN}`);
    console.log(`Age: ${this.state.Age}`);
    console.log(`Category: ${this.state.Category}`);
    console.log(`problem: ${this.state.Problem}`);
    console.log(`Examination: ${this.state.Examination}`);
    console.log(`Diagnosis: ${this.state.Diagnosis}`);
    console.log(`Disscussion: ${this.state.Discussion}`);
    console.log(`location: ${this.state.location}`);
    console.log(localStorage.getItem("token"));
    const editPost = {
      //student_id: this.state.student_id,
      PatientProfile: {
        name: this.state.name,
        HN: this.state.HN,
        Age: this.state.Age,
      },
      Examination: this.state.Examination,
      Problem_list: this.state.Problem_list,
      Diagnosis: this.state.Diagnosis,
      Discussion: this.state.Discussion,
    };

    
    axios
      .put(
        "https://medical-express.herokuapp.com/api/post/update/?_id=" +
          this.props.match.params.id,
        editPost,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => console.log(res.data));

    this.setState({
      name: "",
      HN: "",
      Age: "",
      Category: "",
      Problem: "",
      Examination: "",
      Problem_list: "",
      Diagnosis: "",
      Discussion: "",
    });
    this.props.history.push("/StudentFeed")
  }
  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.onSubmit}>
          <Accordion defaultActiveKey="-1">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Patient Profile
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Form.Group>
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.name}
                      name="name"
                      onChange={this.onChange_data}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>HN</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter patient's HN"
                      value={this.state.HN}
                      name="HN"
                      onChange={this.onChange_data}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter patient's age"
                      value={this.state.Age}
                      name="Age"
                      onChange={this.onChange_data}
                    />
                  </Form.Group>
                  {/* <Form.Group>
                    <SelectCategory
                      dataCat={this.state.Category}
                      onChange={this.onChange_category}
                    />
                  </Form.Group>
                  <Form.Group>
                  <SelectLocation
                    dataLoc={this.state.location}
                    onChange={this.onChange_location}
                  />
                </Form.Group>*/}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            {/*<Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Select Symptoms
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <SelectProblem
                  dataProb={this.state.Problem}
                  onChange={this.onChange_Problem}
                />
              </Accordion.Collapse>
           </Card>*/}
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  Physical Examination
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <Form.Group>
                    <Form.Label>Physical Examination</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="5"
                      value={this.state.Examination}
                      name="Examination"
                      onChange={this.onChange_data}
                    />
                  </Form.Group>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="3">
                  Problem List&Diagnosis
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
                        value={this.state.Problem_list}
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
                        value={this.state.Diagnosis}
                        name="Diagnosis"
                        onChange={this.onChange_data}
                      />
                    </Form.Group>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="4">
                  Add Case
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
                        value={this.state.Discussion}
                        name="Discussion"
                        onChange={this.onChange_data}
                      />
                    </Form.Group>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Post"
              className="btn btn-primary"
            ></input>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}
