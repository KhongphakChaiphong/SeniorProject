import React, { Component } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

export default class SelectCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catatories: [],
    };
  }
  componentDidMount() {
    axios
      .get("https://medical-express.herokuapp.com/api/category/all")
      .then((response) => {
        this.setState({ catatories: response.data });
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
          <Card.Header> Category</Card.Header>
          <Card.Body>
            <div className="form-group">
              <div className="bs-component">
                <select
                  value={this.props.dataCat.category}
                  onChange={this.props.onChange}
                  className="form-control"
                >
                  <option value="">Please choose category</option>
                  {this.state.catatories.map((catagories) => (
                    <option key={catagories._id} value={catagories._id}>
                      {catagories.CategoryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

// <Form>
// <Form.Label>Category</Form.Label>
// <Form.Control
//   as="select"
//   value={this.props.state.category}
//   onChange={this.props.onChange_category}
// >
//   {this.state.catatories.map((catagories) => (
//     <option key={catagories._id}>{catagories.CategoryName}</option>
//   ))}
// </Form.Control>
// </Form>
