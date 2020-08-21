import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default class AdvisorStudentTabs extends Component {
  Render_Student() {
    return this.props.studentData.advisorInfo.advisor_studentCase
      .filter((item) => item.studentInfo.student_year === this.props.year)
      .map((student) => (
        <React.Fragment key={student.studentInfo.student_id}>
        {/*2 ตัวนี้คือรหัสประจำตัวนักศึกษา และ _id ของ user ที่เป็นนศ. ส่งไปหน้า advisorSeeStudentProfile(หน้านศ.รายบุคคล) */}
          {localStorage.setItem("stuPersonal_id", student.studentInfo.student_id),
          localStorage.setItem("stuIDFromDB",student._id)}
          <tr>
            <td>{student.studentInfo.student_name} </td>
            <td>{student.studentInfo.student_id}</td>
            <td>{student.studentInfo.student_year}</td>
            <td>
              
              <Link
                to={{
                  pathname: "/AdvisorSeeStudentProfile",
                  state: student._id
                }}
              >
                <Button>See Post</Button>
              </Link>
            </td>
          </tr>
        </React.Fragment>
      ));
  }
  render() {
    return <React.Fragment>{this.Render_Student()}</React.Fragment>;
  }
}
