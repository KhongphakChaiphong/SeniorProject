import React from "react";
import { Link } from "react-router-dom";

import { useHttpClient } from "../../../shared/hooks/http-hook";

import Button from "../../../shared/components/FormElements/Button";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";

const ListCategory = (props) => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const { displayIcon, displayText, id } = props;

  //Delete hospital
  const deleteHandler = async () => {
    try {
      await sendRequest(
        `https://medical-express.herokuapp.com/api/category/delete/?_id=${props.id}`,
        "DELETE",
        null
      );
      props.onDelete(id);
    } catch (err) {}
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="list">
        <div className="row">
          {/*<div className="col-4 listIcon">
            <img src={displayIcon} alt={displayIcon} />
  </div>*/}
          <div className="col-8 listText">
            <Link class="displayAnchor" to={props.to} exact={props.exact}>
              {displayText}
            </Link>
            <br />
            {id && (
              <div>
                <Button size="small" danger onClick={deleteHandler}>
                  Delete
                </Button>
                <Button size="small" to={`/MainCategory/Category/${id}`}>
                  Edit
                </Button>
              </div>
            )}
          </div>
          {/* <div className="col-4">
                    {id && (
                        <div>
                            <Button danger onClick={deleteHandler}>Delete</Button>
                            <Button to={`/MainCategory/Hospital/${id}`}>
                                Edit
                            </Button>
                        </div>
                    )}
                </div> */}
        </div>
      </div>
      {isLoading && <LoadingSpinner asOverlay />}
    </React.Fragment>
  );
};

export default ListCategory;
