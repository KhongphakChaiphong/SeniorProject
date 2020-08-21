import React, { Component } from "react";
import { Container, Row, Col, Card, Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import AdvisorStudentTabs from "../AdvisorFeedComp/AdvisorStudentTabs";
import AdvisorDashboard from "../AdvisorFeedComp/AdvisorDashboard";

export default class AdvisorFeed extends Component {
  constructor(props) {
    super(props);
    this.onClick_year = this.onClick_year.bind(this);
    this.state = {
      student_list: [],
      year: "1",
    };
  }
  componentDidMount() {
    axios
      .get("https://medical-express.herokuapp.com/api/user/role/?role=advisor")
      .then((response) => {
        this.setState({ student_list: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  Reder_Method() {
    var year =
      this.state.year === "1"
        ? this.state.year
        : this.state.year.charAt(13).toString();
    return this.state.student_list.map(function (item, i) {
      if (localStorage.getItem("user_id") === item._id) {
        return <AdvisorStudentTabs year={year} studentData={item} key={i} />;
      }
    });
  }
  onClick_year(e) {
    this.setState({
      year: e.target.id,
    });
  }
  render() {
    return (
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={6}>
              <Card>
                <Card.Header>Advisor Profile</Card.Header>
                <Card.Body>
                  <Card.Text>
                    Advisor name: Aj. {localStorage.getItem("advisor_name")}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Header>Students who are cared by Advisor</Card.Header>
                <Card.Body>
                  <Tabs id="what" onClick={this.onClick_year}>
                    <Tab eventKey="year1" title="Year1" id="1">
                      <table
                        className="table table-striped"
                        style={{ marginTop: 20 }}
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Year</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>{this.Reder_Method()}</tbody>
                      </table>
                    </Tab>
                    <Tab eventKey="year2" title="Year2" id="2">
                      <table
                        className="table table-striped"
                        style={{ marginTop: 20 }}
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Year</th>
                          </tr>
                        </thead>
                        <tbody>{this.Reder_Method()}</tbody>
                      </table>
                    </Tab>
                    <Tab eventKey="year3" title="Year3" id="3">
                      <table
                        className="table table-striped"
                        style={{ marginTop: 20 }}
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Year</th>
                          </tr>
                        </thead>
                        <tbody>{this.Reder_Method()}</tbody>
                      </table>
                    </Tab>
                    <Tab eventKey="year4" title="Year4" id="4">
                      <table
                        className="table table-striped"
                        style={{ marginTop: 20 }}
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Year</th>
                          </tr>
                        </thead>
                        <tbody>{this.Reder_Method()}</tbody>
                      </table>
                    </Tab>
                    <Tab eventKey="year5" title="Year5" id="5">
                      <table
                        className="table table-striped"
                        style={{ marginTop: 20 }}
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Year</th>
                          </tr>
                        </thead>
                        <tbody>{this.Reder_Method()}</tbody>
                      </table>
                    </Tab>
                    <Tab eventKey="year6" title="Year6" id="6">
                      <table
                        className="table table-striped"
                        style={{ marginTop: 20 }}
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Year</th>
                          </tr>
                        </thead>
                        <tbody>{this.Reder_Method()}</tbody>
                      </table>
                    </Tab>
                  </Tabs>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/*ไม่มีใน sprint */}
          <br />
          <Row className="justify-content-md-center">
            <Col>
              <AdvisorDashboard />
            </Col>
          </Row>
          <br />
        </Container>
      </div>
    );
  }
}
