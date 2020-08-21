import React, { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { VALIDATOR_REQUIRE } from "../../../shared/util/validator";

import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";

const EditProblemFunc = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedProblem, setLoadedProblem] = useState();


  const history = useHistory();
  let id = props.location.search.split("=");
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      capcity: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    console.log(id[1])
    const fetchProblem = async () => {
      try {
        const responseData = await sendRequest(
          "https://medical-express.herokuapp.com/api/problem/?_id="+id[1]
        );
        setLoadedProblem(responseData);

        // if (responseData.place) {
        setFormData(
          {
            name: {
              value: responseData.name,
              isValid: true,
            }
          },
          true
        );
        // }
        // setLoading(false);
        // Set form data we use callback in hook so it won't loop
      } catch (err) {}
    };

    fetchProblem();
  }, [sendRequest, id[1],setFormData]);
  JSON.stringify(loadedProblem);
  const editHandler = async (event) => {
    event.preventDefault();
    // console.log(formState.inputs)
    try {
      await sendRequest(
        "https://medical-express.herokuapp.com/api/problem/update/?_id="+id[1],
        "PUT",
        JSON.stringify({
          name: formState.inputs.name.value,
          
        })
      );
      history.push("/CRUDproblem");
    } catch (err) {}
  };

  return (
    <div class="jumbotron">
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div class="center">
          <LoadingSpinner />
        </div>
      )}
      
      {!isLoading && loadedProblem && (
        <form onSubmit={editHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Problem's name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please input valid info"
            onInput={inputHandler}
            initialValue={loadedProblem.name}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Update
          </Button>
        </form>
      )}
    </div>
  );
};

export default EditProblemFunc;

// import React, { Component } from "react";
// import axios from "axios";
// // import NavAdmin from "../../NavbarAdmin/NavAdmin";
// // import Switch from "react-switch";
// export default class EditProblemFunc extends Component {
//   constructor(props) {
//     super(props);
//     this.onChange_name = this.onChange_name.bind(this);
//     this.onChange_capacity = this.onChange_capacity.bind(this);
//     // this.onChange_status = this.onChange_status.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//     this.handleKeypress = this.handleKeypress.bind(this);
//     this.handleBlur = this.handleBlur.bind(this);
//     this.state = {
//       name: "",
//       capacity: "",
//       // Status: false,
//       catagory: "",
//     };
//   }
//   componentDidMount() {
//     let id = this.props.location.search.split("=");

//     axios
//       .get("https://medical-express.herokuapp.com/api/problem/?_id=" + id[1])
//       .then((response) => {
//         console.log(response);
//         this.setState({
//           name: response.data.name,
//           capacity: response.data.capacity,
//           // Status: response.data.Status,
//           catagory: response.data.catagory,
//         });
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }
//   onChange_name(e) {
//     this.setState({
//       name: e.target.value,
//     });
//   }
//   onChange_capacity(e) {
//     this.setState({
//       capacity: e.target.value,
//     });
//   }
//   handleBlur(e) {
//     if (e.currentTarget.value === "0") e.currentTarget.value = "1";
//   }

//   handleKeypress(e) {
//     const characterCode = e.key;
//     if (characterCode === "Backspace") return;

//     const characterNumber = Number(characterCode);
//     if (characterNumber >= 0 && characterNumber <= 9) {
//       if (e.currentTarget.value && e.currentTarget.value.length) {
//         return;
//       } else if (characterNumber === 0) {
//         e.preventDefault();
//       }
//     } else {
//       e.preventDefault();
//     }
//   }
//   // onChange_status() {
//   //   this.setState({
//   //     Status: !this.state.Status
//   //   });
//   // }
//   onSubmit(e) {
//     e.preventDefault();
//     const obj = {
//       name: this.state.name,
//       capacity: this.state.capacity,
//       // Status: this.state.Status,
//       catagory: this.state.catagory,
//     };
//     let id = this.props.location.search.split("=");
//     axios
//       .put(
//         "https://medical-express.herokuapp.com/api/problem/update/?_id=" +
//           id[1],
//         obj
//       )
//       .then((res) => console.log(res.data));

//     this.props.history.push("/CRUDproblem");
//   }
//   render() {
//     return (
//       <div>
//         {/* <NavAdmin /> */}
//         <h3>Update Problem</h3>
//         <form onSubmit={this.onSubmit}>
//           <div className="form-group">
//             <label>Problem Name</label>
//             <input
//               type="text"
//               className="form-control"
//               value={this.state.name}
//               onChange={this.onChange_name}
//             />
//           </div>
//           <div className="form-group">
//             <label>capacity: </label>
//             <input
//               type="number"
//               onKeyDown={this.handleKeypress}
//               onBlur={this.handleBlur}
//               min="1"
//               step="1"
//               value={this.state.capacity}
//               onChange={this.onChange_capacity}
//               className="form-control"
//             ></input>
//           </div>

//           <br></br>
//           <div className="form-group">
//             <input
//               type="submit"
//               value="Update Problem"
//               className="btn btn-primary"
//             />
//           </div>
//         </form>
//       </div>
//     );
//   }
// }


