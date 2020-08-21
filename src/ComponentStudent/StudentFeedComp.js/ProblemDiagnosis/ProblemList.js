import React, { Component } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

export default class ProblemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      achievement: [],
      problem: [],
    };
  }
  componentDidMount() {
    axios
      .get("https://medical-express.herokuapp.com/api/achievement/all")
      .then((response) => {
        this.setState({ achievement: response.data });
        console.log(this.state.achievement);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("https://medical-express.herokuapp.com/api/problem/all")
      .then((response) => {
        this.setState({ problem: response.data });
        console.log(this.state.problem);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const MapProblem = this.state.problem;
    return (
      <React.Fragment >
        {this.state.achievement.map((item) => (
          <div key={item._id}>
            {item.student_id === localStorage.getItem("user_id") ? (
              <div style={{ display: "flex" }}>
                {item.tasks.map((item) => (
                  <React.Fragment>
                    <div className="cardProblem">
                      <Card style={{height:"325px",padding:15}}>
                      <Card.Header> Task: {item.task}</Card.Header>
                        <Card.Body>
                          <p>quantity: {item.quantity}</p>
                          {MapProblem.map((item2) => (
                            <React.Fragment>
                              {item2._id === item.problem_id ? (
                                <p>Disease: {item2.name}</p>
                              ) : null}
                            </React.Fragment>
                          ))}
                        </Card.Body>
                       <Card.Footer>exp: {item.exp}</Card.Footer>
                      </Card>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </React.Fragment>
    );
  }
}
//<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
//<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
