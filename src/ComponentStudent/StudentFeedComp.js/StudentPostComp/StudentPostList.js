import React, { Component } from "react";
import StudentPost from "./StudentPost";
import Service from "../../../service/api";


export default class StudentPostList extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      PostDetail: [],
      isLoading:true
    };
  }

  componentDidMount() {
    Service.showPostDetail()
      .then((res) => {
        console.log(res.data);
        const PostDetail = res.data;
        this.setState({ PostDetail });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
   
    return (
      <React.Fragment>
        {this.state.PostDetail.reverse().map((item) => {
          return (
            <div key={item._id}>
              <StudentPost data={item} />
          
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
