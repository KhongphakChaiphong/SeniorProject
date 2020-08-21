import React, { Component } from "react";
import { Card } from "react-bootstrap";
import ProblemList from "./ProblemList";
import "../../css/MyCss.css";
import "../StudentPostComp/scrollbar.css";
export default class Problem extends Component {
  render() {
    return (
      <div>
        <div >
          <Card style={{paddingTop:15}}>
            <div className="scrollbar2 scrollbar2-juicy-peach" >
              <ProblemList />
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
