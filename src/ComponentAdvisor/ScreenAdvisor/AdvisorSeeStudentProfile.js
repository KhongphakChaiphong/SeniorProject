import React, { Component } from "react";
import { Container, Row, Col} from "react-bootstrap";
import axios from "axios";
import AdvisorStudentProfile from "../AdvisorSeenStudentProfileComp/AdvisorStudentProfile";

import AdvisorStudentPostList from "../AdvisorSeenStudentProfileComp/AdvisorStudentPostList";
import AdvisorStudentHistory from "../AdvisorSeenStudentProfileComp/AdvisorHistory/AdvisorStudentHistory";
//ต้องส่ง _id ของ student ผ่านทาง Link แล้วเอามาเทียบกับ ._d ของ user/all ในนี้

export default class AdvisorSeeStudentProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      post: [],
    };
    console.log(localStorage.getItem("stuPersonal_id"));
    console.log(localStorage.getItem("stuIDFromDB"));
  }
  componentDidMount() {
    console.log(this.props.location.state )
    //ต้องดึงข้อมูลนศ.จาก user/all เอา _id ของ user
    //ต้องดึง post จาก post/all
    axios
      .get("https://medical-express.herokuapp.com/api/user/all/")
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("https://medical-express.herokuapp.com/api/post/all")
      .then((response) => {
        this.setState({ post: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  Render_Student() {
    return this.state.user.map(function (student, i) {
      if (
        localStorage.getItem("stuPersonal_id") ===
        student.studentInfo.student_id
      ) 
      {
        return <AdvisorStudentProfile data={student} key={i} />;
      }
    });
  }
  Render_Post() {
    return this.state.post.reverse().map(function (post, i) {
      if (localStorage.getItem("stuIDFromDB") === post.student_id) {
        return <AdvisorStudentPostList data={post} key={i} />;
      }
    });
  }

  render() {
    return (
      <React.Fragment>
      <br/>
        <Container>
          <Row>
            <Col>{this.Render_Student()}</Col>
            <Col>
              <AdvisorStudentHistory
                studentUid= {this.props.location.state}
              />
            </Col>
          </Row>
          <br/>
          <Row>
            <Col>{this.Render_Post()}</Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
