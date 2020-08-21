import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import "./MainCategory.css";
import ContentBox from "../../shared/components/UIElements/ContentBox";
import Button from "../../shared/components/FormElements/Button";

export default class MainCategory extends Component {
  constructor(props) {
    super(props);
    // this.delete = this.delete.bind(this);
    this.state = {
      catagories: [],
    };
  }
  delete(id) {
    axios
      .delete(
        "https://medical-express.herokuapp.com/api/category/delete/?_id=" + id
      )
      .then(console.log("delete"))
      .catch((err) => console.log(err));
  }
  componentDidMount() {
    axios
      .get("https://medical-express.herokuapp.com/api/category/all")
      .then((response) => {
        this.setState({ catagories: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // componentDidUpdate() {
  //   axios
  //     .get("https://medical-express.herokuapp.com/api/category/all")
  //     .then((response) => {
  //       this.setState({ catagories: response.data });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  render() {
    return (
      <React.Fragment>
        <ContentBox>
          <Row>
            <Col>
              <Link to="/MainProblemAndCategory">
                <Button>Back</Button>
              </Link>
            </Col>
            <Col>
              <Link to="/AddCategory">
                <Button>Add Category</Button>
              </Link>
            </Col>
          </Row>
          <Container>
            <Row>
              {this.state.catagories.map((catagories) => (
                <Col>
                  <Card style={{ width: "25rem" }}>
                    <Card.Body>
                      <Card.Title>{catagories.CategoryName}</Card.Title>
                      <Row>
                        <Col md={4}>
                          <Link to={"/EditCategory/?id=" + catagories._id}>
                            <Button>Edit Category</Button>
                          </Link>
                        </Col>
                        <Col md={8}>
                          <button
                            onClick={() => this.delete(catagories._id)}
                            className="btn btn-danger"
                          >
                            delete
                          </button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </ContentBox>
      </React.Fragment>
    );
  }
}

//className="col-12 col-md-6  p-card"
