import React, { Component } from "react";
import axios from "axios";
import { Dropdown, DropdownButton } from "react-bootstrap";



const ROLES = ["student", "advisor"];
const Year = ["1", "2", "3", "4", "5", "6"];
export default class AddFunc extends Component {
  constructor(props) {
    super(props);
    this.onChange_data = this.onChange_data.bind(this);
    this.onChange_year = this.onChange_year.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: "",
      password: "",
      role: "",
      name: "",
      student_id: "",
      student_year: "",
      role_check: true,
      user: [],
    };
  }
  onChange_data = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onChange_year(e) {
    this.setState({
      student_year: e.target.value,
    });
  }


  onSubmit(e) {
    e.preventDefault();
    // ส่งไป endpoint
    console.log(`Form submitted:`);
    console.log(`username: ${this.state.username}`);
    console.log(`password: ${this.state.password}`);
    console.log(`role: ${this.state.role}`);
    console.log(`fullName: ${this.state.name}`);
    console.log(`Student_id: ${this.state.student_id}`);
    console.log(`student_year: ${this.state.student_year}`);
    

    const newAdvisor = {
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
      advisorInfo: {
        advisor_name: this.state.role === "advisor" ? this.state.name : "",
      },
      studentInfo: {
        student_name: this.state.role === "student" ? this.state.name : "",
        student_id: this.state.role === "student" ? this.state.student_id : "",
        student_year:
          this.state.role === "student" ? this.state.student_year : "",
      },
    };

    axios
      .post("https://medical-express.herokuapp.com/api/user/create", newAdvisor)
      .then((res) => console.log(res.data));

    //พอกด submit ให้ค่าในtext เป็นค่าดังนี้
    this.setState({
      username: "",
      password: "",
      role: "",
      name: "",
      student_advisor: "",
      //advisor_studentCase: "",
    });

    this.props.history.push("/CRUDuser");
    //window.location.href = "/CRUDuser";
    
  }
  componentDidMount() {
    axios
      .get("https://medical-express.herokuapp.com/api/user/all")
      .then((response) => {
        this.setState({ user: response.data });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>role</label>
            <DropdownButton
              onChange={this.onCheck_role}
              id="dropdown-basic-button"
              title={this.state.role ? this.state.role : "โปรดระบุหน้าที่"}
            >
              {ROLES.map((role) => (
                <Dropdown.Item
                  onClick={() =>
                    this.setState({ role: role, role_check: false })
                  }
                >
                  {role}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
          <div className="form-group">
            <label>username</label>
            <input
              type="text"
              className="form-control"
              value={this.state.username}
              name="username"
              onChange={this.onChange_data}
            ></input>
          </div>
          <div className="form-group">
            <label>password</label>
            <input
              type="text"
              className="form-control"
              value={this.state.password}
              name="password"
              onChange={this.onChange_data}
            ></input>
          </div>
          <div className="form-group">
            <label>name</label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              name="name"
              onChange={this.onChange_data}
            ></input>
          </div>
          {this.state.role === "student" && (
            <div className="form-group">
              <div>
                <label>studentID</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.student_id}
                  name="student_id"
                  onChange={this.onChange_data}
                ></input>
              </div>
              <label for="inputSelect" className="control-label">
                Select Year
              </label>
              <div className="bs-component">
                <select
                  value={this.state.student_year}
                  onChange={this.onChange_year}
                  className="form-control"
                >
                  <option value="">Please select Year</option>
                  {Year.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <div className="form-group">
            <input
              type="submit"
              value="Add user"
              className="btn btn-primary"
              disabled={this.state.role_check}
            ></input>
          </div>
        </form>
      </div>
    );
  }
}


