import React, { useEffect, useState }  from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { Tab, Tabs } from "react-bootstrap";

import { useHttpClient } from '../../shared/hooks/http-hook';

import ContentBox from '../../shared/components/UIElements/ContentBox';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button'

import './HospitalDetailPage.css';

const yearTotal= 6;

const HospitalDetailPage = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();

    const [allStudent, setAllStudent]= useState();

    const [showModal, setShowModal] = useState(false);

    const showModalHandler = () => setShowModal(true);
    const closeModalHandler = () => setShowModal(false);
    const history = useHistory();
    const hospitalId = useParams().id;

    const backHandler = () => {
        history.push('/MainCategory/Hospital');
    }

    // Fetching all data to see who in the system 
    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest('https://medical-express.herokuapp.com/api/user/all')
                console.log(responseData);
                setAllStudent(responseData);
            }
            catch (err) {}
        }
        fetchPlace();
    }, [sendRequest])

    // Fetching data in specific hospital to see all data in hospital
    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(`https://medical-express.herokuapp.com/api/hospital/?_id=${hospitalId}`)
                setLoadedPlace(responseData);
                console.log(responseData);
            } catch (err) { }
        }
        fetchPlace();
    }, [sendRequest, hospitalId, showModal])

    // เพื่มนศลงโรงบาล
    const addNewStudentHandler = (id, name) => async event => {
        event.preventDefault();
        try {
            await sendRequest(
                `https://medical-express.herokuapp.com/api/hospital/addStudent/?_id=${hospitalId}`,
                'PUT',
                JSON.stringify({
                    student_id: [id]
                })
            )
        } catch (err) { }
        console.log(id)

        setAllStudent(allStudent.filter( student => student._id !== id));
        console.log(allStudent)
    
        alert('เพื่มนักศึกษา ' + name + ' เรียบร้อยครับ')
    }
    
    return(
        <>
        <ErrorModal error={error} onClear={clearError} />
            {/* Modal for adding hospital */}
            <Modal
                show={showModal}
                onCancel={closeModalHandler}
                header="เพื่มนักศึกษาที่ทำงานในโรงพยาบาล"
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={
                    <Button onClick={closeModalHandler}>เพิ่มเสร็จสิ้น</Button>
                }
            >
            {isLoading && <LoadingSpinner/>}
            {!isLoading && loadedPlace &&
                (
                <>
                <Tabs defaultActiveKey="year1" transition={false}>
                    {/* ทำการวนลูป 6 ครั้งเนื่องจากมี 6 ชั้นปี กำหนดตัวแปรธรรมดา ๆ yearTotal */}
                    {[...Array(yearTotal)].map((e,index) => (
                        // ใช้ generated index+1 แทนชั้นปี 1,2,3 -> 6
                        <Tab key={index} eventKey={`year${index+1}`} title={`ชั้นปี ${index+1}`}>
                            <table className="col-12">
                                <thead>
                                    <tr>
                                        <th>รหัสนักศึกษา</th>
                                        <th>ชื่อนักศึกษา</th>
                                        <th>ชั้นปี {index+1}</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { allStudent && loadedPlace && (
                                        allStudent
                                        // เลือกเฉพาะนศ
                                        .filter((item) => item.role === 'student')
                                        // ชั้นปีของนศจะเปลี่ยนไปตาม index+1 หรือ tabs ที่ถูกกด
                                        .filter((item) => item.studentInfo.student_year === `${index + 1}`)
                                        .filter( function (item) {
                                            return !loadedPlace.studentList.some(function(item2){
                                                return item.studentInfo.student_name === item2.studentInfo.student_name
                                            })
                                        }).map(item => (
                                            <tr key={index+1}>
                                                <td>{item.studentInfo.student_id || ''}</td>
                                                <td>{item.studentInfo.student_name}</td>
                                                <td>{item.studentInfo.student_year}</td>
                                                <td className='borderButton'>
                                                    <button onClick={addNewStudentHandler(item._id, item.studentInfo.student_name,)}>
                                                        เพิ่ม
                                                    </button>
                                                </td>
                                           </tr>
                                        ))
                                    )                                    
                                    }
                                </tbody>
                            </table>
                        </Tab>
                    ))}
                </Tabs> 
                </>
                )
            }      
            </Modal>
            
        <ContentBox
            inner
            backButton
            addButton= "Add Students"
            backHandler={backHandler}
            click={showModalHandler}
        >
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedPlace &&
                (
                    <div className="row">
                        <div className="col-6">
                            <h1>{loadedPlace.hospitalName}</h1>
                            <br/>
                            <h2>ที่อยู่</h2>
                            <h3>{loadedPlace.hospitalAddress}</h3>
                        </div>
                        <div className="col-6">
                            <h2>รายชื่อนักศึกษา | จำนวน {loadedPlace.studentList.length} คน</h2>
                            <Tabs defaultActiveKey="year1" transition={false}>
                                {/* ทำการวนลูป 6 ครั้งเนื่องจากมี 6 ชั้นปี กำหนดตัวแปรธรรมดา ๆ yearTotal */}
                                {[...Array(yearTotal)].map((e, index) => (
                                    // ใช้ generated index+1 แทนชั้นปี 1,2,3 -> 6
                                    <Tab key={index} eventKey={`year${index + 1}`} title={`ชั้นปี ${index + 1}`}>
                                        <table className="col-12">
                                            <thead>
                                                <tr>
                                                    <th>รหัสนักศึกษา</th>
                                                    <th>ชื่อนักศึกษา</th>
                                                    <th>ชั้นปี {index + 1}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allStudent && (
                                                    loadedPlace.studentList
                                                        // เลือกเฉพาะนศ
                                                        .filter((item) => item.role === 'student')
                                                        // ชั้นปีของนศจะเปลี่ยนไปตาม index+1 หรือ tabs ที่ถูกกด
                                                        .filter((item) => item.studentInfo.student_year === `${index + 1}`)
                                                        .map(item => (
                                                            <tr key={index}>
                                                                <td>{item.studentInfo.student_id || ''}</td>
                                                                <td>{item.studentInfo.student_name}</td>
                                                                <td>{item.studentInfo.student_year}</td>
                                                            </tr>
                                                        ))
                                                )
                                                }
                                            </tbody>
                                        </table>
                                    </Tab>
                                ))}
                            </Tabs> 
                        </div>
                    </div>
                )
            }
            
        </ContentBox>
        </>
    );
}

export default HospitalDetailPage;