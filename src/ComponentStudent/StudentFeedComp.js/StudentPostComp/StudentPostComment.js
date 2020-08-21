import React, { Component } from "react";
import { InputGroup, FormControl, Button, Card } from "react-bootstrap";
import axios from "axios";
export default class StudentPostComment extends Component {
  constructor(props) {
    super(props);
    this.onChange_comment = this.onChange_comment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      postId: "",
      detail: "",
    };
  }
  onChange_comment(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`detail: ${this.state.detail}`);
    console.log(`postID: ${this.props.postID}`);
    const newComment = {
      postId: this.props.postID,
      detail: this.state.detail,
    };
    axios
      .post(
        "https://medical-express.herokuapp.com/api/comment/create",
        newComment,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        window.location.reload()
        console.log(res.data)
      });

    this.setState({
      detail: "",
    });
  }
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <Card>
            <Card.Body>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>comment here</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl name="detail" onChange={this.onChange_comment} />
                <Button variant="success" type="submit">
                  Send comment
                </Button>
              </InputGroup>
            </Card.Body>
          </Card>
        </form>
      </React.Fragment>
    );
  }
}
