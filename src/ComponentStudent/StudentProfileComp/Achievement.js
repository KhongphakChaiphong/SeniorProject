import React, { useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import AchievementList from "./AchievementList";

const Achievement = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <Card.Text>Achievement</Card.Text>
        </Card.Header>
        <Card.Body>
          <Button variant="primary" onClick={handleShow}>
            Click bait
          </Button>

          <Modal show={show} onHide={handleClose} animation={true}>
            <Modal.Header closeButton>
              <Modal.Title style={{ textAlign: "center" }}>
                Achievement
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            <AchievementList name="Diease1"/>
            <AchievementList name="Diease2"/>
            <AchievementList name="Diease3"/>
            <AchievementList name="Diease4"/>
            <AchievementList name="Diease5"/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default Achievement;
