import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import TableRowAdvisor from "../AdminCRUDComp/UserCRUD/TableRowAdvisor";
import TableRowStudent from "../AdminCRUDComp/UserCRUD/TableRowStudent";
import ContentBox from "../../shared/components/UIElements/ContentBox";
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

// Service api
import Service from "../../service/api";

const ROLES = ["student", "advisor"];
export class CRUDuser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      isLoading:true,
      role: "advisor",
    };
  }

  componentDidMount() {
    Service.showList()
      .then((res) => {
        console.log(res.data);
        // console.log(res.data[1].studentInfo.student_name)
        const user = res.data;
        this.setState({ user });
      })
      .catch((err) => {
        console.log(err);
      });
      
    // axios
    //   .get("https://medical-express.herokuapp.com/api/user/all")
    //   .then((response) => {
    //     this.setState({ user: response.data });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.user.length !== prevState.user.length) {
      return axios
        .get("https://medical-express.herokuapp.com/api/user/all")
        .then((response) => {
          this.setState({ user: response.data,isLoading:false });
          console.log(this.state.user.length);
          console.log(prevState.user.length)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  userList() {
    return this.state.user.map(function (currentUser, i) {
      return <TableRowAdvisor userData={currentUser} key={i} />;
    });
  }

  userList2() {
    return this.state.user.map(function (currentUser, i) {
      return <TableRowStudent userData={currentUser} key={i} />;
    });
  }
  render() {
    const {isLoading}=this.state;
    return (
      <React.Fragment>
      <ContentBox>
        <div>
          {/* <NavAdmin /> */}
          <div>
            <div>
              <h3>User List</h3>
              <div>
                <div className="container">
                  <div className="row">
                    <DropdownButton
                      id="dropdown-basic-button"
                      title={this.state.role}
                    >
                      {ROLES.map((role) => (
                        <Dropdown.Item key={role}
                          onClick={() => this.setState({ role: role })}
                        >
                          {role}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>

                    <Link to="/AddFunc">
                      <Button className="btn btn-success">AddUser</Button>
                    </Link>
                  </div>
                </div>
              </div>
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  {this.state.role === "student" ? (
                    <tr>
                      <th>userName</th>
                      <th>name</th>
                      <th>role</th>
                      <th>StudentID</th>
                      <th>Year</th>
                      <th>Student Task</th>
                      <th></th>

                      <th></th>
                    </tr>
                  ) : (
                    <tr>
                      <th>userName</th>
                      <th>name</th>
                      <th>role</th>
                      <th>Student</th>
                      <th></th>
                      <th></th>
                    </tr>
                  )}
                </thead>
                {this.state.user.length===0?(<div>No User data</div>):(<tbody>
                  {isLoading && (
                    <div class="center">
                        <LoadingSpinner asOverlay />
                    </div>
                  )}
                    {this.state.role === "student"
                      ? this.userList2()
                      : this.userList()}
                  </tbody>)}
                
              </table>
            </div>
          </div>
        </div>
      </ContentBox>
      </React.Fragment>
    );
  }
}

export default CRUDuser;

