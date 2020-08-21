import React, { Component } from "react";
import axios from "axios";

export default class EditProblemFunc extends Component {
  constructor(props) {
    super(props);
    this.onChange_CategoryName = this.onChange_CategoryName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
     CategoryName:""
    };
  }
  componentDidMount() {
    let id = this.props.location.search.split("=");
    axios
      .get("https://medical-express.herokuapp.com/api/category/?_id=" + id[1])
      .then(response => {
        console.log(response);
        this.setState({
          CategoryName: response.data.CategoryName
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  onChange_CategoryName(e) {
    this.setState({
      CategoryName: e.target.value
    });
  }


  onSubmit(e) {
    e.preventDefault();
    const obj = {
      CategoryName: this.state.CategoryName
    };
    let id = this.props.location.search.split("=");
    axios
      .put(
        "https://medical-express.herokuapp.com/api/category/update/?_id=" +
          id[1],obj
      )
      .then(res => console.log(res.data));

    this.props.history.push("/MainCategory");
  }
  render() {
    return (
      <div>
        {/* <NavAdmin /> */}
        <h3>Update Category</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              className="form-control"
              value={this.state.CategoryName}
              onChange={this.onChange_CategoryName}
            />
          </div>
          <br></br>
          <div className="form-group">
            <input
              type="submit"
              value="Update Problem"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

