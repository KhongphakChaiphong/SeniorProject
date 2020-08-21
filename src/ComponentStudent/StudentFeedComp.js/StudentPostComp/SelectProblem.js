import React, { Component } from "react";
import axios from "axios";
import { Card, ListGroup, ListGroupItem, InputGroup } from "react-bootstrap";
export default class SelectProblem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: [],
    };
  }
  componentDidMount() {
    axios
      .get("https://medical-express.herokuapp.com/api/problem/all")
      .then((response) => {
        this.setState({ problem: response.data });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <React.Fragment>
      <Card>
      <Card.Header>Select a symptom</Card.Header>
      
        <Card.Body>
          <div className="scrollbar scrollbar-dusty-grass">
            {this.state.problem.map((problem) => (
              <div key={problem._id}>
                {problem.Status === false ? (
                  <div
                    className="radio"
                    value={this.props.dataProb}
                    onChange={this.props.onChange}
                  >
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Radio
                          key={problem._id}
                          checked={this.props.dataProb === problem._id}
                          value={problem._id}
                        ></InputGroup.Radio>
                        <InputGroup.Text>{problem.name}</InputGroup.Text>
                      </InputGroup.Prepend>
                    </InputGroup>
                    <br />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

// <select
//   value={this.state.advisor_studentCase}
//   onChange={this.onChange_AdvisorStudentCase}
//   className="form-control"
// >
//   <option value="">Please choose students</option>
//   {this.state.user.map((user) =>
//     user.role === "student" ? (
//       <option key={user._id} value={user._id}>
//         {user.studentInfo.student_name}
//       </option>
//     ) : null
//   )}
// </select>;
