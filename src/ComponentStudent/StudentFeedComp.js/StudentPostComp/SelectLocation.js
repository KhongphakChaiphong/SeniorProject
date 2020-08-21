import React, { Component } from "react";
import axios from "axios";
export default class SelectLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
    };
  }
  componentDidMount() {
    axios
      .get("https://medical-express.herokuapp.com/api/hospital/all")
      .then((response) => {
        this.setState({ location: response.data });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <label for="inputSelect" className="control-label">
            Location
          </label>
          <div className="bs-component">
            <select
              value={this.props.dataLoc.hospitalName}
              onChange={this.props.onChange}
              className="form-control"
            >
              <option value="">Please choose location</option>
              {this.state.location.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.hospitalName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
