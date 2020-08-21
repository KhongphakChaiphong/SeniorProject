import React, { Component } from "react";
// import NavAdmin from "../../NavbarAdmin/NavAdmin";
import axios from "axios";
import { InputGroup, ListGroup,Card } from "react-bootstrap";
export default class EditFunc extends Component {
  constructor(props) {
    super(props);
    this.onChange_Edit = this.onChange_Edit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange_AdvisorStudentCase = this.onChange_AdvisorStudentCase.bind(this);
    this.state = {
      username: "",
      password: "",
      role: "",
      advisor_name: "",
      advisor_studentCase: [],
      student_name: "",
      student_id: "",
      user_all:[]
    };
  }
  componentDidMount() {
    axios
      .get(
        "https://medical-express.herokuapp.com/api/user/?_id=" +
          this.props.match.params.id
      )
      .then((response) => {
        console.log(response);
        this.setState({
          username: response.data.username,
          password: response.data.password,
          role: response.data.role,
          advisor_name: response.data.advisorInfo.advisor_name,
          advisor_studentCase: response.data.advisorInfo.advisor_studentCase,
          student_name: response.data.studentInfo.student_name,
          student_id: response.data.studentInfo.student_id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("https://medical-express.herokuapp.com/api/user/all")
      .then((res) => {
        this.setState({ user_all: res.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onChange_Edit(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onChange_AdvisorStudentCase(e) {
    const advisor_studentCase = this.state.advisor_studentCase;
    let index;
    if (e.target.checked) {
      advisor_studentCase.toString();
      advisor_studentCase.push(e.target.value);
    } else {
      index = advisor_studentCase.indexOf(e.target.value);
      advisor_studentCase.splice(index, 1);
    }
    this.setState({
      advisor_studentCase: advisor_studentCase,
    });
    console.log(advisor_studentCase);
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
      advisorInfo: {
        advisor_name: this.state.advisor_name,
      },
      studentInfo: {
        student_name: this.state.student_name,
        student_id: this.state.student_id,
      },
    };
    const stuCase = {
      student_id: this.state.advisor_studentCase,
    };
    console.log("stuCase: "+this.state.advisor_studentCase)
 
    axios
      .put(
        "https://medical-express.herokuapp.com/api/user/update/?_id=" +
          this.props.match.params.id,
        obj
      )
      .then((res) => console.log(res.data))
      .catch(function (error) {
        console.log(error);
      });

    axios
      .put(
        "https://medical-express.herokuapp.com/api/user/addStudent/?_id=" +
          this.props.match.params.id,
        stuCase
      )
      .then((response) => console.log(response.data))
      .catch(function (error) {
        console.log(error);
      });


    this.props.history.push("/CRUDuser");
  }
  render() {
    let AdvisorStudent=this.state.advisor_studentCase.map((item)=>item._id)
    let User=this.state.user_all
    return (
      <div>
        {/* อันนี้แค่ชื่อ header ด้านบน*/}
        {this.state.role === "student" ? (
          <div>
            <h3>Update Student</h3>
          </div>
        ) : (
          <div>
            <h3>Update Advisor</h3>
          </div>
        )}

        <form onSubmit={this.onSubmit}>
          <div>
            <div className="form-group">
              <label>UserName:</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChange_Edit}
              />
            </div>
            <div className="form-group">
              <label>password:</label>
              <input
                type="text"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChange_Edit}
              />
            </div>
            {/* อันนี้แค่ชื่อ form ถ้าเป็น role ไหนให้ขึ้น textInput ของ role นั้นๆ*/}
            {this.state.role === "student" ? (
              <div>
                <div className="form-group">
                  <label>Student Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="student_name"
                    value={this.state.student_name}
                    onChange={this.onChange_Edit}
                  />
                </div>
                <div className="form-group">
                  <label>Student id:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="student_id"
                    value={this.state.student_id}
                    onChange={this.onChange_Edit}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label>Advisor Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="advisor_name"
                    value={this.state.advisor_name}
                    onChange={this.onChange_Edit}
                  />
                </div>
              </div>
            )}
            <br />

            {this.state.role === "advisor" ? (
              <div className="form-group">


                <Card style={{padding:25}}>
                  <label>student who this advisor took care</label>
                  {AdvisorStudent&&User&&(
                    User.filter((item)=>item.role==='student')
                    .filter(function(item){
                      console.log("User student role:     "+item._id)
                      console.log("AdvisorStudent:       "+AdvisorStudent)
                      return !AdvisorStudent.some(function(item2){
                        return item._id===item2
                      })
                     
                      }).map(item=>(<InputGroup
                        key={item._id}
                        className="mb-3"
                        onChange={this.onChange_AdvisorStudentCase}
                      >
                        <InputGroup.Prepend>
                          <InputGroup.Checkbox
                            value={item._id}
                          ></InputGroup.Checkbox>
                        </InputGroup.Prepend>
                        <ListGroup.Item>
                          {item.studentInfo.student_name}
                        </ListGroup.Item>
                      </InputGroup>))
                    
                  )}
                </Card>
              </div>
            ) : null}

            <div className="form-group">
              <input
                type="submit"
                value="Update User"
                className="btn btn-primary"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}



// .filter(function(item){
//   console.log("User student role:     "+item._id)
//   console.log("AdvisorStudent:       "+AdvisorStudent)
//   return item._id===AdvisorStudent._id
//   })

// .filter(function(item){
//   return !AdvisorStudent._id.some(function(item2){
//     return item===item2
//   }).map(item=>(<InputGroup
//     key={item._id}
//     className="mb-3"
//     onChange={this.onChange_AdvisorStudentCase}
//   >
//     <InputGroup.Prepend>
//       <InputGroup.Checkbox
//         value={item._id}
//       ></InputGroup.Checkbox>
//     </InputGroup.Prepend>
//     <ListGroup.Item>
//       {item.studentInfo.student_name}
//     </ListGroup.Item>
//   </InputGroup>))
// })