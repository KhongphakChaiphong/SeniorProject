import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { FaUserCog, FaUserMinus } from "react-icons/fa";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";

export default class TableRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openConfirmDeleteModalHandler= this.openConfirmDeleteModalHandler.bind(this);
    this.closeConfirmDeleteModalHandler= this.closeConfirmDeleteModalHandler.bind(this);
    this.state = {
      advisorName: '',
      confirmDeleteModal: false,
      showModal: false,
      isLoading: true,
      AdvisorStudent: [],
    };
  }

  openConfirmDeleteModalHandler=(name)=> event => {
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

  

  showModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }
  closeModal() {
    this.setState({
      showModal: false,
    });
  }
  componentDidMount() {
    axios
      .get("https://medical-express.herokuapp.com/api/user/role/?role=advisor")
      .then((response) => {
        this.setState({ AdvisorStudent: response.data, isLoading: false });
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  delete() {
    axios
      .delete(
        "https://medical-express.herokuapp.com/api/user/delete/?_id=" +
          this.props.userData._id
      )
      .then( () => {
        console.log("delete")
        window.location.reload();
      }
      )
      .catch((err) => console.log(err));
  }

  render() {
    const { isLoading } = this.state;

    return (
      <React.Fragment>
        {this.props.userData.role === "advisor" ? (
          <tr key={this.props.userData._id}>
            <td>{this.props.userData.username}</td>
            <td>AJ. {this.props.userData.advisorInfo.advisor_name}</td>
            <td>{this.props.userData.role}</td>
            <td>
              <button onClick={this.showModal} className="btn btn-primary">
                Student
              </button>
            </td>
            <td>
              <Link to={"/EditFunc/" + this.props.userData._id}>
                <button className="btn btn-warning">
                  Edit Advisor <FaUserCog color="white" size="20" />
                </button>
              </Link>
            </td>
            <td>
              <button onClick={this.openConfirmDeleteModalHandler(this.props.userData.advisorInfo.advisor_name)} className="btn btn-danger">
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
        

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header>
            Student who took cared by AJ.
            {this.props.userData.advisorInfo.advisor_name}
          </Modal.Header>
          <Modal.Body>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name:</th>
                  <th>ID:</th>
                  <th>Year: </th>
                </tr>
              </thead>
              {isLoading && (
                <div className="center">
                  <LoadingSpinner asOverlay />
                </div>
              )}
              <tbody>
                {this.state.AdvisorStudent.map((item) => (
                  <React.Fragment>
                    {this.props.userData._id === item._id ? (
                      <React.Fragment key={item._id}>
                        {item.advisorInfo.advisor_studentCase.length !== 0 ? (
                          <React.Fragment>
                            {" "}
                            {item.advisorInfo.advisor_studentCase.map(
                              (item2) => (
                                <React.Fragment key={item2._id}>
                                  <tr>
                                    <td> {item2.studentInfo.student_name}</td>
                                    <td> {item2.studentInfo.student_id}</td>
                                    <td>{item2.studentInfo.student_year}</td>
                                  </tr>
                                </React.Fragment>
                              )
                            )}
                          </React.Fragment>
                        ) : (
                          <div>no student</div>
                        )}
                      </React.Fragment>
                    ) : null}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <div className="form-group">
              <button onClick={this.closeModal} className="btn btn-primary">
                Close
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}
