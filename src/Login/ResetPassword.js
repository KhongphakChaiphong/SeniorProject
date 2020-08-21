import React from 'react';


import { useForm } from '../shared/hooks/form-hook'
import Button from '../shared/components/FormElements/Button';
import Input from '../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../shared/util/validator';

import { useHttpClient } from '../shared/hooks/http-hook';


const ResetPassword = () => {

    const { sendRequest } = useHttpClient();

    const [formState, inputHandler] = useForm({
        username: {
            value: '',
            isValid: false
        },
        newPassword: {
            value: '',
            isValid: false
        }
    }, false)

    const resetPassword = async event => {
        event.preventDefault();
        
        //Check value
        console.log(formState.inputs)
        try {

            const responseData= await sendRequest(
                // https://medical-express.herokuapp.com/api/hospital/?token=${token}
                "https://medical-express.herokuapp.com/api/user/resetPassword",
                'PUT',
                JSON.stringify({
                    username: formState.inputs.username.value,
                    newPassword: formState.inputs.newPassword.value,
                })
            )

            console.log(responseData);
        }
        catch (err) {

        }
    }

    return (
        <>
            <form onSubmit={resetPassword}>
                <Input
                    id="username"
                    element="input"
                    type="text"
                    label="username"
                    errorText="No you can't spacebar, man"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                />
                <Input
                    id="newPassword"
                    element="input"
                    type="text"
                    label="new password"
                    errorText="Can't be blank space"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                />

                <Button
                    type="submit"
                    disabled={!formState.isValid}
                >
                    Reset password
                    </Button>
            </form>
        </>
    );
}

export default ResetPassword;
