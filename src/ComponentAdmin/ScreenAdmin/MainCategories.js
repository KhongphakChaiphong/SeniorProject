import React,{ useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validator";

import { useHttpClient } from "../../shared/hooks/http-hook";

import ContentBox from "../../shared/components/UIElements/ContentBox";
import Category from "../AdminCRUDComp/CategoryCRUD/Category";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const MainCategories = (props) => {
    const history = useHistory();
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [spinnerStatus, setSpinnerStatus] = useState(false);
  const [loadedCategory, setLoadedCategory] = useState();
  const [showModal, setShowModal] = useState(false);

  const [formState, inputHandler] = useForm(
    {
      // This is a initialInput
      CategoryName: {
        value: "",
        isValid: false,
      }
    },
    false
  );

  //Fetch all hospital data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const responseData = await sendRequest(
          `https://medical-express.herokuapp.com/api/category/all`
        );
        // name of the the key value : place
        setLoadedCategory(responseData);
        console.log(responseData);
      } catch (err) {}
    };
    setSpinnerStatus(false);
    fetchCategory();
  }, [sendRequest, showModal]);

  const showModalHandler = () => setShowModal(true);
  const closeModalHandler = () => setShowModal(false);

  const changeSpinnerHandler = () => setSpinnerStatus(true);

  const backHandler = () => {
    history.push("/MainProblemAndCategory");
  };

  //create new hospital data
  const addMoreCategoryHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "https://medical-express.herokuapp.com/api/category/create",
        "POST",
        JSON.stringify({
          CategoryName: formState.inputs.CategoryName.value
        })
      );
      setShowModal(false);
    } catch (err) {}
  };

  const categoryDeletedHandler = (deletedCategoryId) => {
    setLoadedCategory((prevCategory) =>
      prevCategory.filter((category) => category._id !== deletedCategoryId)
    );
    console.log(deletedCategoryId);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      {/* Modal for adding hospital */}
      <Modal
        show={showModal}
        onCancel={closeModalHandler}
        header="Adding Category"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
      >
        <form onSubmit={addMoreCategoryHandler}>
          <Input
            id="CategoryName"
            element="input"
            type="text"
            label="Category's Name"
            errorText="No you can't spacebar, man"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
        
          <Button
            onClick={changeSpinnerHandler}
            type="submit"
            disabled={!formState.isValid}
          >
            Add Category
          </Button>
        </form>
        {spinnerStatus && <LoadingSpinner asOverlay />}
      </Modal>

      <ContentBox
        backHandler={backHandler}
        backButton={true}
        addButton="Add more Category"
        click={showModalHandler}
        inner={true}
      >
        {isLoading && <LoadingSpinner asOverlay />}
        {!isLoading && loadedCategory && (
          <Category
            cardContent={loadedCategory}
            onDeleteCategory={categoryDeletedHandler}
          />
        )}
      </ContentBox>
    </React.Fragment>
  );
};

export default withRouter(MainCategories);
