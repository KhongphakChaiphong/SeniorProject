import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ToggleButtonStatus from "./ProblemComponent/ToggleButtonStatus";
import { FaEdit, FaTrash } from "react-icons/fa";
export default class TableRowProblem1 extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  delete() {
    axios
      .delete(
        "https://medical-express.herokuapp.com/api/problem/delete/?_id=" +
          this.props.problemData._id
      )
      .then(console.log("delete"))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <tr>
          <td className={this.props.problemData.Status ? "complete" : ""}>
            {this.props.problemData.name}
          </td>
          <td>
            <ToggleButtonStatus StatusProps={this.props.problemData} />
          </td>
          <td>
            <Link to={"/EditProblemFunc/?id=" + this.props.problemData._id}>
              <button className="btn btn-warning">
                Edit Problem
                <FaEdit color="white" />
              </button>
            </Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">
              <FaTrash color="white" /> Delete
            </button>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}
