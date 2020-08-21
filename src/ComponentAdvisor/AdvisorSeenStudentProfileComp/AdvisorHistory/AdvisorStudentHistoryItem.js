import React from "react";

import { Card, Accordion, Button } from "react-bootstrap";

const AdvisorStudentHistoryItem = (props) => {
  return (
    <React.Fragment>
      <Accordion defaultActiveKey="3">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {/* Seperate into 3 part: monday, dd/mm/yy, time */}
              {props.currentTime.split(",")[1]}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              PatientName: {props.patientName}
              <br />
              Diagnosis: {props.Diagnosis}
              <br />
              HN: {props.HN}
              <br />
              Location: โรงพยาบาลประชุมไทย
              <br />
              Approved: {props.approval.toString()}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </React.Fragment>
  );
};

export default AdvisorStudentHistoryItem;
