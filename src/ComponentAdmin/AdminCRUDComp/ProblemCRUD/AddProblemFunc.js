import React, { Component } from "react";
import axios from "axios";
import ContentBox from "../../../shared/components/UIElements/ContentBox";

export default class AddProblemFunc extends Component {
  constructor(props) {
    super(props);
    //make sure all of method are bound to this obj ไม่อย่างนั้นเราจะไม่มีสิทธิ์ access ถึง obj ใน state
    this.onChange_name = this.onChange_name.bind(this);
    // this.onChange_catagory = this.onChange_catagory.bind(this);
    this.onChange_capacity = this.onChange_capacity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.state = {
      name: "",
      catagory: "",
      capacity: "",
      status: false,
    };
  }
  // onChange_data=(e)=>{
  //   this.setState({
  //     [e.target.name]:e.target.value
  //   })
  // }
  onChange_name(e) {
    this.setState({
      name: e.target.value,
    });
  }
  // onChange_catagory(e) {
  //   this.setState({
  //     catagory: e.target.value
  //   });
  // }
  handleBlur(e) {
    if (e.currentTarget.value === "0") e.currentTarget.value = "1";
  }

  handleKeypress(e) {
    const characterCode = e.key;
    if (characterCode === "Backspace") return;

    const characterNumber = Number(characterCode);
    if (characterNumber >= 0 && characterNumber <= 9) {
      if (e.currentTarget.value && e.currentTarget.value.length) {
        return;
      } else if (characterNumber === 0) {
        e.preventDefault();
      }
    } else {
      e.preventDefault();
    }
  }

  onChange_capacity(e) {
    this.setState({
      capacity: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    // ส่งไป endpoint
    console.log(`Form submitted:`);
    console.log(`name: ${this.state.name}`);
    console.log(`catagory: ${this.state.catagory}`);
    console.log(`capacity: ${this.state.capacity}`);
    console.log(`status: ${this.state.status}`);

    const newProblem = {
      name: this.state.name,
      //catagory: this.props.location.categoryNameProps,
      capacity: this.state.capacity,
      status: this.state.status,
    };

    axios
      .post(
        "https://medical-express.herokuapp.com/api/problem/create",
        newProblem
      )
      .then((res) => {
        console.log(res.data)
        window.location.reload();
      })
      .catch( (err)=>{
        console.log(err);
      })
      ;

    //พอกด submit ให้ค่าในtext เป็นค่าดังนี้
    this.setState({
      name: "",
      //catagory: "",
      capacity: "",
    });
  
    this.props.history.push("/CRUDproblem");
  }
  render() {
    return (
      <ContentBox>
        <div style={{ marginTop: 20 }}>
          <h3>Create New Problem</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={this.onChange_name}
              ></input>
            </div>
            <div className="form-group">
              <label>capacity: </label>
              <input
                type="number"
                onKeyDown={this.handleKeypress}
                onBlur={this.handleBlur}
                min="1"
                step="1"
                value={this.state.capacity}
                onChange={this.onChange_capacity}
                className="form-control"
              ></input>
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Add Problem"
                className="btn btn-primary"
              ></input>
            </div>
          </form>
        </div>
      </ContentBox>
    );
  }
}

// <div className="form-group">
//   <label>catagory</label>
//   <DropdownButton id="dropdown-basic-button" title={this.state.catagory ? this.state.catagory : "Please choose catagory"}>
//     {CATAGORY.map(catagory => (
//       <Dropdown.Item onClick={() => this.setState({ catagory: catagory })}>
//         {catagory}
//       </Dropdown.Item>
//     ))}
//   </DropdownButton>
// </div>
