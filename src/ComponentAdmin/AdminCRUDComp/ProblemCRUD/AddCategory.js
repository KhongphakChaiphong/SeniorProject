import React, { Component } from "react";
import axios from "axios";

import ContentBox from "../../../shared/components/UIElements/ContentBox";
export default class AddProblemFunc extends Component {
  constructor(props) {
    super(props);
    //make sure all of method are bound to this obj ไม่อย่างนั้นเราจะไม่มีสิทธิ์ access ถึง obj ใน state
    this.onChange_CategoryName = this.onChange_CategoryName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      CategoryName: ""
    };
  }
  onChange_CategoryName(e) {
    this.setState({
      CategoryName: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    // ส่งไป endpoint
    console.log(`Form submitted:`);
    console.log(`name: ${this.state.CategoryName}`);

    const newCategory = {
      CategoryName: this.state.CategoryName
    };
    axios
      .post(
        "https://medical-express.herokuapp.com/api/category/create",
        newCategory
      )
      .then(res => console.log(res.data));

    //พอกด submit ให้ค่าในtext เป็นค่าดังนี้
    this.setState({
      CategoryName: ""
    });

    this.props.history.push("/MainCategory");
  }
  render() {
    return (
      <ContentBox>
        <div style={{ marginTop: 20 }}>
          <h3>Create New Category</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>category</label>
              <input
                type="text"
                className="form-control"
                value={this.state.CategoryName}
                onChange={this.onChange_CategoryName}
              ></input>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Add Problem"
                className="btn btn-primary"
              ></input>
            </div>
          </form>
        </div>
      </ContentBox>
    );
  }
}
