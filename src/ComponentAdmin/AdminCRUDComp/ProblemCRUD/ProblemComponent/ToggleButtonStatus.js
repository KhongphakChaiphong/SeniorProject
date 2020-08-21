import React, { Component } from "react";
import Switch from "react-switch";
import axios from "axios";
export default class ToggleButtonStatus extends Component {
  constructor(props) {
    super(props);
    this.onChange_status = this.onChange_status.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      Status: false
    };
  }
  onChange_status() {
    this.setState({
      Status: !this.state.Status
    });

    const obj = {
      Status: !this.state.Status
    };
    axios
      .put(
        "https://medical-express.herokuapp.com/api/problem/update/?_id=" +
          this.props.StatusProps._id,
        obj
      )
      .then(res => console.log(res.data));
    console.log(this.props.StatusProps._id);
    console.log(this.props.StatusProps.Status);
    
  }

  //   onSubmit(e) {
  //     e.preventDefault();
  //     const obj = {
  //       Status: this.state.Status,
  //     };
  //     axios
  //       .put(
  //         "https://medical-express.herokuapp.com/api/problem/update/?_id=" +
  //         this.props.StatusProps._id,obj
  //       )
  //       .then(res => console.log(res.data));
  //   }

  componentDidMount() {
    axios
      .get(
        "https://medical-express.herokuapp.com/api/problem/?_id=" +
          this.props.StatusProps._id
      )
      .then(response => {
        console.log(response);
        this.setState({
          Status: response.data.Status
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <Switch
            className="react-switch"
            onChange={this.onChange_status}
            checked={this.state.Status}
            onColor="#08f"
            offColor="#0ff"
            onHandleColor="#08f"
            offHandleColor="#0ff"
            handleDiameter={30}
            boxShadow="0px 1px 5px rgba(0,0,0,0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0,0,0,0.2)"
            checkedIcon={false}
            uncheckedIcon={false}
            height={40}
            width={70}
          />
          <p>
            this problem is <b>{this.state.Status ? "Inactive" : "Active"}</b>
          </p>
        </div>
      </div>
    );
  }
}
