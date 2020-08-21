import React, { Component } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import ProgressBar from "./ProgressBar";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };
  }
  componentDidMount() {
    axios
      .get("https://medical-express.herokuapp.com/api/user/all/")
      .then((response) => {
        this.setState({ user: response.data });
        console.log(this.state.user);
      });
  }
  render() {
    let lvl
    let maxLvl
    
    return (
      <React.Fragment>
        {this.state.user
          .filter((item) => item.role === "student")
          .filter((item2) => item2._id === localStorage.getItem("user_id"))
          .map((item3)=>(
            <Card>
            <Card.Header>
            <p style={{fontWeight:"bold"}}>Student Name: <text style={{fontWeight:"normal"}}>{item3.studentInfo.student_name}</text> </p>
            </Card.Header>
            <Card.Body>
            <p style={{fontWeight:"bold"}}>ID:  <text style={{fontWeight:"normal"}}>{item3.studentInfo.student_id}</text> </p>
            <p style={{fontWeight:"bold"}}>Year:  <text style={{fontWeight:"normal"}}>{item3.studentInfo.student_year}</text> </p>
            <p style={{fontWeight:"bold"}}>totalExp: <text style={{fontWeight:"normal"}}>{item3.studentInfo.student_exp}</text> </p>
           
              {console.log(lvl=Math.floor(item3.studentInfo.student_exp/4))}
              {console.log(maxLvl=(lvl+1)*4)}
              { item3.studentInfo.student_exp /maxLvl  === 1 ? (
                <div>
                <p style={{fontWeight:"bold"}}>level :  <text style={{fontWeight:"normal"}}> {lvl=Math.floor(item3.studentInfo.student_exp/4)}</text> </p>
                {console.log((item3.studentInfo.student_exp*100)/maxLvl)+1}
                <ProgressBar done={(item3.studentInfo.student_exp*100)/maxLvl} />
                </div>
              )
            : (
              <div>
              <p style={{fontWeight:"bold"}}>level :  <text style={{fontWeight:"normal"}}> {lvl=Math.floor(item3.studentInfo.student_exp/4)}</text> </p>
                {console.log((item3.studentInfo.student_exp*100)/maxLvl)}
                <ProgressBar done={(item3.studentInfo.student_exp*100)/maxLvl} />

              </div>
            )
            }
          
           

              {/*test expo : {lvl=Math.floor(16/4)}
              {console.log(lvl)}
              {console.log(maxLvl=(lvl)*4)}
              {console.log((item3.studentInfo.student_exp*100)/maxLvl)}
              <ProgressBar done={(16/maxLvl) * 100} />
              <p>{maxLvl}</p>
              <Card.Text>Total EXP: { (item3.studentInfo.student_exp) }</Card.Text>
          */}            
              </Card.Body>
          </Card>
          ))
        }
       
      </React.Fragment>
    );
  }
}


//item3.studentInfo.student_name