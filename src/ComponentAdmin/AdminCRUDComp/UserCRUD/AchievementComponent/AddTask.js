import React, { Component } from "react";
import axios from "axios";

export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeData = this.onChangeData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeProblem = this.onChangeProblem.bind(this);
    this.state = {
      problems: [],
      task: "",
      quantity: "",
      exp: "",
      problem_id: "",
    };
  }
  componentDidMount() {
    axios
      .get("https://medical-express.herokuapp.com/api/problem/all/")
      .then((response) => {
        this.setState({
          problems: response.data,
        });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onChangeData(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onChangeProblem(e) {
    this.setState({
      problem_id: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(`Form submitted:`);
    console.log(`task: ${this.state.task}`);
    console.log(`quantity: ${this.state.quantity}`);
    console.log(`exp: ${this.state.exp}`);
    console.log(`problem_id: ${this.state.problem_id}`);

    const newTask = {
      task: this.state.task,
      quantity: this.state.quantity,
      exp: this.state.exp,
      problem_id: this.state.problem_id,
    };
    const id = this.props.match.params.id;
    console.log(id);
    axios
      .put(
        "https://medical-express.herokuapp.com/api/achievement/update/?_id=" +
          id,
        newTask
      )
      .then((res) => console.log(res.data));

    //พอกด submit ให้ค่าในtext เป็นค่าดังนี้
    this.setState({
      task: "",
      quantity: "",
      exp: "",
      problem_id: "",
    });

    this.props.history.push("/CRUDuser");
    //window.location.href = "/CRUDuser";
  }
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Task</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Task</label>
            <p>{this.props.match.params.id}</p>
            <input
              type="text"
              className="form-control"
              value={this.state.task}
              name="task"
              onChange={this.onChangeData}
            ></input>
          </div>
          <div className="form-group">
            <label>quantity</label>
            <input
              type="text"
              className="form-control"
              value={this.state.quantity}
              name="quantity"
              onChange={this.onChangeData}
            ></input>
          </div>
          <div className="form-group">
            <label>exp</label>
            <input
              type="text"
              className="form-control"
              value={this.state.exp}
              name="exp"
              onChange={this.onChangeData}
            ></input>
          </div>

          <div className="form-group">
            <div className="bs-component">
              <select
                value={this.state.problem_id}
                onChange={this.onChangeProblem}
                className="form-control"
              >
                <option value="">Please select problem</option>
                {this.state.problems.map((problem) => (
                  <React.Fragment>
                    {problem.Status === false ? (
                      <option key={problem._id} value={problem._id}>
                        {problem.name}
                      </option>
                    ) : null}
                  </React.Fragment>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Add user"
              className="btn btn-primary"
            ></input>
          </div>
        </form>
      </div>
    );
  }
}
