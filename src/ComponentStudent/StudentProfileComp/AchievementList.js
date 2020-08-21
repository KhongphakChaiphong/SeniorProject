import React, { Component } from "react";
import { Card } from "react-bootstrap";
export default class AchievementList extends Component {
  render() {
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
