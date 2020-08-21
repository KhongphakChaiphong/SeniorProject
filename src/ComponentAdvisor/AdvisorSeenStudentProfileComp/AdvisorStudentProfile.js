import React, { Component } from "react";
import { Card, Button, Row, Col} from "react-bootstrap";
import ProgressBar from "../../ComponentStudent/StudentProfileComp/ProgressBar";
export default class AdvisorStudentProfile extends Component {
  constructor(props) {
    super(props);
    this.Back_Func = this.Back_Func.bind(this);
  }
  Back_Func() {
    window.location.href = "/AdvisorFeed";
    localStorage.removeItem("stuPersonal_id");
  }
  render() {
    let lvl
    let maxLvl
    
    return (
      <React.Fragment>
        <Card>
          <Card.Header>
            <Row>
              <Col md={2}>
                <Button onClick={this.Back_Func}>Back</Button>
              </Col>
              <Col md={10}>
                <p style={{fontWeight:"bold"}}>Student Name: <text style={{fontWeight:"normal"}}>{this.props.data.studentInfo.student_name}</text> </p>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
          <p style={{fontWeight:"bold"}}>ID:  <text style={{fontWeight:"normal"}}>{this.props.data.studentInfo.student_id}</text> </p>
            <p style={{fontWeight:"bold"}}>Year:  <text style={{fontWeight:"normal"}}>{this.props.data.studentInfo.student_year}</text> </p>
            <p style={{fontWeight:"bold"}}>totalExp: <text style={{fontWeight:"normal"}}>{this.props.data.studentInfo.student_exp}</text> </p>
            {console.log(lvl=Math.floor(this.props.data.studentInfo.student_exp/4))}
            {console.log(maxLvl=(lvl+1)*4)}
            { this.props.data.studentInfo.student_exp /maxLvl  === 1 ? (
              <div>
              <p style={{fontWeight:"bold"}}>level :  <text style={{fontWeight:"normal"}}> {lvl=Math.floor(this.props.data.studentInfo.student_exp/4)}</text> </p>
              {console.log((this.props.data.studentInfo.student_exp*100)/maxLvl)+1}
              <ProgressBar done={(this.props.data.studentInfo.student_exp*100)/maxLvl} />
              </div>
            )
          : (
            <div>
            <p style={{fontWeight:"bold"}}>level :  <text style={{fontWeight:"normal"}}> {lvl=Math.floor(this.props.data.studentInfo.student_exp/4)}</text> </p>
              {console.log((this.props.data.studentInfo.student_exp*100)/maxLvl)}
              <ProgressBar done={(this.props.data.studentInfo.student_exp*100)/maxLvl} />

            </div>
          )
          }
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}
