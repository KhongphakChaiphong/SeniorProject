import React from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useHistory } from "react-router-dom";
import { VALIDATOR_REQUIRE } from "../../shared/util/validator";
import { useForm } from "../../shared/hooks/form-hook";

import axios from "axios";
import TableRow from "../AdminCRUDComp/ProblemCRUD/TableRow";
import ContentBox from "../../shared/components/UIElements/ContentBox";

import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Modal from "../../shared/components/UIElements/Modal";

const CRUDproblem = () => {
  const { sendRequest} = useHttpClient();
  const [showModal, setShowModal] = React.useState(false);
  const history = useHistory();
  const [data, setData] = React.useState();

  const showModalHandler = () => setShowModal(true);
  const closeModalHandler = () => setShowModal(false);
  const backHandler = () => {
    history.push("/MainProblemAndCategory");
  };

  const [formState, inputHandler] = useForm(
    {
      // This is a initialInput
      name: {
        value: "",
        isValid: false,
      },
      capacity: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  React.useEffect(() => {
    axios
      .get("https://medical-express.herokuapp.com/api/problem/all")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sendRequest, showModal]);

  //create new hospital data
  const addMoreProblem = async (event) => {
    event.preventDefault();

    // กรณีหลุดออกจาก loop = ไม่มีข้อมูล ให้ฟังก์ชันดำเนินต่อ
    try {
      await sendRequest(
        "https://medical-express.herokuapp.com/api/problem/create",
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          capacity: formState.inputs.capacity.value,
          status: false,
        })
      );
      setShowModal(false);
    } catch (err) {}
  };

  return (
    <div>
      <Modal
        show={showModal}
        onCancel={closeModalHandler}
        header="Adding Hospital"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
      >
        <form onSubmit={addMoreProblem}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Hospital's Name"
            errorText="No you can't spacebar, man"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            id="capacity"
            element="textarea"
            type="text"
            label="Capacity"
            errorText="Can't be blank space"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Add Problem
          </Button>
        </form>
      </Modal>
      {!data &&  <LoadingSpinner asOverlay />}

      {data && (
        <ContentBox
          backHandler={backHandler}
          inner={true}
          backButton={true}
          addButton="Add Problem"
          click={showModalHandler}
        
        >
          <TableRow content={data} />
        </ContentBox>
      )}
    </div>
  );
};

export default CRUDproblem;

// export default class CRUDproblem extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       problem: [],
//       resetCode: 0
//     };
//   }
//   componentDidMount() {
//     axios
//       .get("https://medical-express.herokuapp.com/api/problem/all")
//       .then((response) => {
//         this.setState({ problem: response.data });
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }

//   // componentDidUpdate() {
//   //   axios
//   //     .get("https://medical-express.herokuapp.com/api/problem/all")
//   //     .then((response) => {
//   //       this.setState({ problem: response.data });
//   //     })
//   //     .catch(function (error) {
//   //       console.log(error);
//   //     });
//   // }

//   resetHandler= () => {
//     this.setState({
//       resetCode: this.state.resetCode+1
//     });
//   }

//   problemList1() {
//     return this.state.problem.map(function (currentProblem, i) {
//       return <TableRowProblem1 problemData={currentProblem} key={i} />;
//     });
//   }

//   render() {
//     return (
//       <ContentBox
//         backButton={true}
//         addButton="Add Problems man"
//         inner={true}
//       >
//         <div>
//           <div className="container">
//             <div className="row">
//               <button onClick={this.resetHanlder}>Reset me</button>
//               <PButton
//                 to={`/AddProblemFunc`}
//               >
//                 Helloworld
//               </PButton>
//               {/* <Link
//                 to={{
//                   pathname: "/AddProblemFunc",
//                   categoryNameProps: this.props.location.categoryProps,
//                 }}
//               >
//                 <Button className="btn btn-success">AddProblem</Button>
//               </Link> */}
//             </div>
//           </div>
//         </div>
//         <table
//           resetCode={this.state.resetCode}
//           className="table table-striped"
//           style={{ marginTop: 20 }}
//         >
//           <thead>
//             <tr>
//               <th>Problem name</th>
//               <th>Capacity</th>
//               <th>Status</th>
//               <th></th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>{this.problemList1()}</tbody>
//         </table>
//       </ContentBox>
//     );
//   }
// }
