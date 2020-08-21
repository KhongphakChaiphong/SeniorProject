import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { VALIDATOR_REQUIRE } from "../../../shared/util/validator";

import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";

const CategoryDetail = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [LoadedCategory, setLoadedCategory] = useState();
  const categoryId = useParams().id;

  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      CategoryName: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  // const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const responseData = await sendRequest(
          `https://medical-express.herokuapp.com/api/category/?_id=${categoryId}`
        );
        setLoadedCategory(responseData);

        // if (responseData.place) {
        setFormData(
          {
            categoryName: {
              value: responseData.categoryName,
              isValid: true,
            },
          },
          true
        );
        // }
        // setLoading(false);
        // Set form data we use callback in hook so it won't loop
      } catch (err) {}
    };

    fetchCategory();
  }, [sendRequest, categoryId, setFormData]);

  JSON.stringify(LoadedCategory);

  const editHandler = async (event) => {
    event.preventDefault();
    // console.log(formState.inputs)
    try {
      await sendRequest(
        `https://medical-express.herokuapp.com/api/category/update/?_id=${categoryId}`,
        "PUT",
        JSON.stringify({
          CategoryName: formState.inputs.CategoryName.value,
        })
      );
      history.push("/MainCategory/Category");
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
      {!isLoading && LoadedCategory && (
        <form onSubmit={editHandler}>
          <Input
            id="CategoryName"
            element="input"
            type="text"
            label="Category's name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please input valid info"
            onInput={inputHandler}
            initialValue={LoadedCategory.CategoryName}
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

export default CategoryDetail;
