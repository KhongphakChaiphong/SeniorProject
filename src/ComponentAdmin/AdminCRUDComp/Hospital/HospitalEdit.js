import React, {useEffect, useState} from 'react';

import { useParams,useHistory } from 'react-router-dom'
import { useForm } from '../../../shared/hooks/form-hook'
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { VALIDATOR_REQUIRE } from '../../../shared/util/validator'

import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import Input from '../../../shared/components/FormElements/Input'
import Button from '../../../shared/components/FormElements/Button'
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';

import './HospitalEdit.css'

const HospitalEdit = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();
    const hospitalId = useParams().id;

    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm({
        hospitalName: {
            value: '',
            isValid: false
        },
        hospitalAddress: {
            value: '',
            isValid: false
        }
    }, false)

    // const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(`https://medical-express.herokuapp.com/api/hospital/?_id=${hospitalId}`)
                setLoadedPlace(responseData);

                // if (responseData.place) {
                setFormData({
                    hospitalName: {
                        value: responseData.hospitalName,
                        isValid: true
                    },
                    hospitalAddress: {
                        value: responseData.hospitalAddress,
                        isValid: true
                    }
                },
                    true
                );
                // }
                // setLoading(false);
                // Set form data we use callback in hook so it won't loop

            } catch (err) { }
        }

        fetchPlace();
    }, [sendRequest,hospitalId, setFormData])

    JSON.stringify(loadedPlace);

    const editHandler = async (event) => {
        event.preventDefault();
        // console.log(formState.inputs)
        try {
            await sendRequest(
                `https://medical-express.herokuapp.com/api/hospital/update/?_id=${hospitalId}`,
                'PUT',
                JSON.stringify({
                    hospitalName: formState.inputs.hospitalName.value,
                    hospitalAddress: formState.inputs.hospitalAddress.value
                })
            )
            history.push('/MainCategory/Hospital')
        } catch (err) { }
    }

    // if (isLoading) {
    //     return (
    //         <div className="center">
    //             <LoadingSpinner />
    //         </div>
    //     )
    // }

    return (
        <div class="jumbotron">  
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div class="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedPlace &&
                <form onSubmit={editHandler}>
                    <Input
                        id="hospitalName"
                        element="input"
                        type="text"
                        label="Hospital's name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please input valid info"
                        onInput={inputHandler}
                        initialValue={loadedPlace.hospitalName}
                        initialValid={true}
                    />

                    <Input
                        id="hospitalAddress"
                        element="textarea"
                        type="text"
                        label="Hospital's address"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="more than 5"
                        onInput={inputHandler}
                        initialValue={loadedPlace.hospitalAddress}
                        initialValid={true}
                    />

                        <Button type="submit" disabled={!formState.isValid}>
                            Update
                        </Button>
                </form>
            }
        </div>
    )

}


export default HospitalEdit;