import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
//import { Modal } from "react-bootstrap";
import { FaUserCog, FaUserMinus } from "react-icons/fa";
import PModal from "../../../shared/components/UIElements/Modal";

import { Modal } from "react-bootstrap";


class TableRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.deleteAchievement = this.deleteAchievement.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.openConfirmDeleteModalHandler = this.openConfirmDeleteModalHandler.bind(this);
    this.closeConfirmDeleteModalHandler = this.closeConfirmDeleteModalHandler.bind(this);
    this.state = {
      confirmDeleteModal: false,
      isShow: false,
      Problem: [],
      achievement: [],
    };
  }

  closeModalHanlder = () => {
    this.setState({
      isShow: false,
    });
  };

  openModalHandler = () => {
    this.setState({
      isShow: true,
    });
  };

  openConfirmDeleteModalHandler = (name) => event => {
    event.preventDefault();
    this.setState({
      advisorName: name,
      confirmDeleteModal: !this.state.confirmDeleteModal
    })
  }

  closeConfirmDeleteModalHandler() {
    this.setState({
      confirmDeleteModal: false
    })
  }

  registerAchievementHandler = (id) => event => {
    event.preventDefault();
    axios
      .post(`https://medical-express.herokuapp.com/api/achievement/create/?_id=${id}`)
      .then((res) => {
        console.log(res.data)
        alert('HelloWorld: ' + id);
        window.location.reload();
      }
      )
      .catch((err) => alert(err));
  }

  addNewAchievementHandler = (id) => event => {
    event.preventDefault();
    this.state.achievement.filter((item) => (
      item.student_id === id
    ))
      .map((item) => {
        console.log(item);
        this.props.history.push(`/AddTask/${item._id}`)
      });
      
  }


  delete() {
    axios
      .delete(
        "https://medical-express.herokuapp.com/api/user/delete/?_id=" +
        this.props.userData._id
      )
      .then(() => {
        console.log("delete")
        window.location.reload()
      }
      )
      .catch((err) => console.log(err));

  }

  deleteAchievement = (id) => event => {
    event.preventDefault();
    this.state.achievement.filter((item) => (
      item.student_id === id
    ))
      .map((item) => {
        console.log(item);
        axios
          .delete(
            "https://medical-express.herokuapp.com/api/achievement/delete/?_id=" +
            item._id
          )
          .then(console.log("delete"))
          .catch((err) => console.log(err));
      })
  }


  deleteTask = (id, pid, i) => event => {
    event.preventDefault();
    console.log("PID: " + pid)
    const problemId = {
      problem_id: [pid]
    }
    this.state.achievement.filter((item) => (
      item.student_id === id
    ))
      .map((item) => {
        console.log(item);
        axios
          .put(
            "https://medical-express.herokuapp.com/api/achievement/delete/tasks/?_id=" + item._id, problemId
          )
          .then(console.log("delete"))
          .catch((err) => console.log(err));
      })
  }

  componentDidMount() {
    // console.log(this.props);
    axios
      .get("https://medical-express.herokuapp.com/api/achievement/all")
      .then((res) => {
        // console.log(res.data);
        // res.data.map(({ student_id })=>{
        //   console.log(student_id);
        // })
        res.data
          .filter(({ student_id }) => (
            student_id === this.props.userData._id
          ))
          .map((item) => {
            // console.log(item)
          })
        this.setState({
          achievement: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("https://medical-express.herokuapp.com/api/problem/all")
      .then((res) => {
        this.setState({
          Problem: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showGoalHandler = () => {
    alert("HelloWorld");
  };

  render() {
    const MapProblem = this.state.Problem;
    // const MapProblemID=MapProblem.map((item)=>item._id)
    // console.log(MapProblemID)


    return (
      <React.Fragment>
        {this.props.userData.role === "student" ? (
          <tr>
            <td> {this.props.userData.username}</td>
            <td> {this.props.userData.studentInfo.student_name}</td>
            <td>{this.props.userData.role}</td>
            <td>{this.props.userData.studentInfo.student_id}</td>
            <td>{this.props.userData.studentInfo.student_year}</td>
            <td>
              <button onClick={this.openModalHandler}>Show goal</button>
            </td>
            <td>
              <Link to={"/EditFunc/" + this.props.userData._id}>
                <button className="btn btn-warning">
                  Edit Student <FaUserCog size="20" color="white" />
                </button>
              </Link>
            </td>
            <td>
              <button onClick={this.openConfirmDeleteModalHandler(this.props.userData.studentInfo.student_name)} className="btn btn-danger">
                delete <FaUserMinus size="20" color="white" />
              </button>
            </td>
          </tr>
        ) : null}

        {/* Modal สำหรับแจ้งเตือนเวลาลบข้อมูล */}
        <Modal show={this.state.confirmDeleteModal} onHide={this.closeConfirmDeleteModalHandler}>
          <Modal.Header>
            ยืนยันการลบ
          </Modal.Header>
          <Modal.Body>
            ทำการลบ: {this.state.advisorName}
          </Modal.Body>
          <Modal.Footer>
            <div className="form-group">
              <button onClick={this.closeConfirmDeleteModalHandler} className="btn btn-outline-danger">
                ยกเลิก
              </button>
              <button onClick={this.delete} className="btn btn-success">
                ยืนยัน
              </button>
            </div>
          </Modal.Footer>
        </Modal>

        <PModal
          show={this.state.isShow}
          onCancel={this.closeModalHandler}
          header="Student's goal"
          contentClass="place-item__modal-content"
          footerClass="place-item__modal-actions"
          footer={<button onClick={this.closeModalHanlder}>Close</button>}
        >
          {this.state.achievement.length !== 0 ? (
            <>
              <div className="row">
                <div className="col-6" style={{ textAlign: "start" }}>
                  <button onClick={this.registerAchievementHandler(this.props.userData._id)}>ลงทะเบียน Achievement</button>
                </div>
                <div className="col" style={{ textAlign: "end" }}>
                  <button onClick={this.addNewAchievementHandler(this.props.userData._id)}>เพิ่ม Task</button>
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>tasks</th>
                    <th>quantity</th>
                    <th>problem</th>
                    <th>exp</th>
                    <th><button className="btn btn-danger" onClick={this.deleteAchievement(this.props.userData._id)}>Delete Achievement</button></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.achievement.map((item) => (
                    <React.Fragment>
                      {this.props.userData._id === item.student_id ? (
                        <React.Fragment key={item._id}>
                          {item.tasks.length !== 0 ? (
                            <React.Fragment>
                              {" "}
                              {item.tasks.map((item2) => (
                                <React.Fragment key={item2._id}>
                                  <tr>
                                    <td> {item2.task}</td>
                                    <td> {item2.quantity}</td>
                                    <td>
                                      {" "}
                                      {item2.problem_id === MapProblem._id ? (
                                        <td>{MapProblem.name}</td>
                                      ) : null}
                                      {MapProblem.map((item) => (
                                        <div>
                                          {item._id === item2.problem_id ? (
                                            <div>{item.name}</div>
                                          ) : null}
                                        </div>
                                      ))}
                                    </td>

                                    <td>Exp {item2.exp}</td>
                                    <td><button className="btn btn-danger" onClick={this.deleteTask(this.props.userData._id, item2.problem_id)}>Delete Task</button></td>
                                  </tr>
                                </React.Fragment>
                              ))}
                            </React.Fragment>
                          ) : null}
                        </React.Fragment>
                      ) : null}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
              <tr>no task</tr>
            )}
        </PModal>
      </React.Fragment>
    );
  }
}

export default withRouter(TableRow);

// <Modal show={this.state.isShow} onHide={this.closeModal}>
//   <Modal.Header>Achievement</Modal.Header>
//   <Modal.Body>
//     {this.state.achievement.length !== 0 ? (
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>tasks</th>
//             <th>quantity</th>
//             <th>problem</th>
//             <th>exp</th>
//           </tr>
//         </thead>
//         <tbody>
//         {this.state.achievement.map((item) => (
//           <React.Fragment>
//             {this.props.userData._id === item.student_id ? (
//               <React.Fragment key={item._id}>
//                 {item.tasks.length !== 0 ? (
//                   <React.Fragment>
//                     {" "}
//                     {item.tasks.map(
//                       (item2) => (
//                         <React.Fragment key={item2._id}>
//                           <tr>
//                             <td> {item2.task}</td>
//                             <td> {item2.quantity}</td>
//                             <td>{item2.problem_id}</td>
//                             <td>Exp {item2.exp}</td>
//                           </tr>
//                         </React.Fragment>
//                       )
//                     )}
//                   </React.Fragment>
//                 ) : (
//                   null
//                 )}
//               </React.Fragment>
//             ) :  null}
//           </React.Fragment>
//         ))}
//         </tbody>
//       </table>
//     ) : <tr>no task</tr>
//     }
//   </Modal.Body>
// </Modal>
