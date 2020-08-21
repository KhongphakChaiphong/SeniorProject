import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Profile from "../StudentProfileComp/Profile";
import History from "../StudentProfileComp/History";
import Achievement from "../StudentProfileComp/Achievement";

export default class StudentProfile extends Component {
  render() {
    return (
      <React.Fragment>
      <Card style={{padding:25}}>
        <div className="container">
          <div className="row">
            <div className="col">
              <Profile />
            </div>
            <div className="col">
              <History />
            </div>
          </div>
          <br />
         {/* <div className="row">
            <div className="col">
              <Achievement />
            </div>
    </div>*/}
        </div>
        </Card>
      </React.Fragment>
    );
  }
}
