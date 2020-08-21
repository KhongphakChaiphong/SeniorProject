import React, { useState, useEffect } from 'react';

import { withRouter, useHistory } from 'react-router-dom'
import { useForm } from '../../shared/hooks/form-hook'
import { VALIDATOR_REQUIRE } from '../../shared/util/validator';

import { useHttpClient } from '../../shared/hooks/http-hook';

import ContentBox from '../../shared/components/UIElements/ContentBox';
import List from '../AdminCRUDComp/Hospital/List'
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const HospitalPage = (props) => {
    const history = useHistory();

    const { isLoading, sendRequest, error, clearError } = useHttpClient();
    const [spinnerStatus, setSpinnerStatus] = useState(false);
    const [loadedPlaces, setLoadedPlace] = useState();
    const [showModal, setShowModal] = useState(false);

    const [searchName, setSearchName] = useState("");

    const [formState, inputHandler] = useForm({
        // This is a initialInput
        hospitalName: {
            value: '',
            isValid: false
        },
        hospitalAddress: {
            value: '',
            isValid: false
        }
    }, false)

    //Fetch all hospital data
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(`https://medical-express.herokuapp.com/api/hospital/all`);
                // name of the the key value : place
                setLoadedPlace(responseData);
                console.log(responseData);
            } catch (err) {

            }
        }
        setSpinnerStatus(false);
        fetchPlaces();
    }, [sendRequest, showModal])


    const showModalHandler = () => setShowModal(true);
    const closeModalHandler = () => setShowModal(false);

    const changeSpinnerHandler = () => setSpinnerStatus(true);

    // เอาไว้ค้นหาโรงบาล
    const searchSubmitHandler = (event) => {
        event.preventDefault();
        for (let i = 0; i < loadedPlaces.length; i++) {
            // หั่นข้อมูล ตัวอย่าง) โรงพยาบาลพาน => [โรงพยาบาล, พาน]
            console.log(loadedPlaces[i].hospitalName.split('โรงพยาบาล')[1])
            // cond1) ถ้าใส่ชื่อเต็มแล้วเจอ หรือใส่แค่ชื่อโรงพยาบาลเช่น พาน
            if (searchName === loadedPlaces[i].hospitalName
                || searchName === loadedPlaces[i].hospitalName.split('โรงพยาบาล')[1]
            ) {
                // Return เพื่อหยุด loop กรณีเจอแล้ว
                alert('มีข้อมูลอยู่ในฐานข้อมูลอยู่แล้ว')
                return;
            }
        }

        // ถ้าหลุดออกมาจาก loop แสดงว่าไม่เจอข้อมูลในฐานข้อมูล
        alert('ไม่พบโรงพยาบาลในฐานข้อมูล');
    }

    const backHandler = () => {
        history.push('/');
    }

    //create new hospital data
    const addMoreHospitalHandler = async event => {
        event.preventDefault();

        // Loop เพื่อแสดงข้อมูลทั้งหมดในฐานข้อมูล
        for (let i = 0; i < loadedPlaces.length; i++) {
            // กรณีโรงพยาบาลที่จะเพิ่มมีอยู่ในฐานอยู่แล้วจะไม่สามารถเพื่มได้ วิธีเช็คเหมือนกับ "searchSubmitHandler"
            if (formState.inputs.hospitalName.value === loadedPlaces[i].hospitalName
                || formState.inputs.hospitalName.value === loadedPlaces[i].hospitalName.split('โรงพยาบาล')[1]
            ) {
                // กรณีเจอข้อมูล จะ return เพื่อหยุด function ไว้แค่นี้ วิธีการทำงานของ js จะไล่จากบนลงล่าง ถ้าใส่ return จะไม่วิ่งไปทำงานด้านล่างต่อ
                alert('มีข้อมูลอยู่แล้ว')
                setShowModal(false);
                return;
            }
        }

        // กรณีหลุดออกจาก loop = ไม่มีข้อมูล ให้ฟังก์ชันดำเนินต่อ
        try {

            await sendRequest(
                'https://medical-express.herokuapp.com/api/hospital/create',
                'POST',
                JSON.stringify({
                    hospitalName: formState.inputs.hospitalName.value,
                    hospitalAddress: formState.inputs.hospitalAddress.value
                })
            )
            setShowModal(false);
        }
        catch (err) {

        }
    }

    // ส่ง function ไปใช้ที่ component listItem เวลากดลบจะทำการ filter ตัวที่ถูกลบออกจาก array 
    const placeDeletedHandler = (deletedPlaceId) => {
        setLoadedPlace(prevPlace => prevPlace.filter(place => place._id !== deletedPlaceId));
        console.log(deletedPlaceId);
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />

            {/* Modal for adding hospital */}
            <Modal
                show={showModal}
                onCancel={closeModalHandler}
                header="Adding Hospital"
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                onSubmit={addMoreHospitalHandler}
            >
                    <Input
                        id="hospitalName"
                        element="input"
                        type="text"
                        label="Hospital's Name"
                        errorText="No you can't spacebar, man"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                    />
                    <Input
                        id="hospitalAddress"
                        element="textarea"
                        type="text"
                        label="Address"
                        errorText="Can't be blank space"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                    />
                    <Button
                        onClick={changeSpinnerHandler}
                        type="submit"
                        disabled={!formState.isValid}
                    >
                        Add hospital
                    </Button>
                {spinnerStatus && <LoadingSpinner asOverlay />}
            </Modal>

            <ContentBox
                backHandler={backHandler}
                backButton={true}
                addButton="Add more hospital"
                click={showModalHandler}
                inner={true}
                extraComponent={
                    <form onSubmit={searchSubmitHandler}>
                        <input
                            type="text"
                            value={searchName}
                            onChange={e => setSearchName(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>
                }
            >
                {isLoading && <LoadingSpinner asOverlay />}
                {!isLoading && loadedPlaces &&
                    <List
                        cardContent={loadedPlaces}
                        onDeletePlace={placeDeletedHandler}
                    />
                }
            </ContentBox>
        </React.Fragment>
    );
}

export default withRouter(HospitalPage);