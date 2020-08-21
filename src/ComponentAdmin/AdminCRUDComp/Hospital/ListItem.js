import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import { useHttpClient } from '../../../shared/hooks/http-hook';

import Button from '../../../shared/components/FormElements/Button';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../../shared/components/UIElements/Modal';

import './ListItem.css'
import ContentBox from '../../../shared/components/UIElements/ContentBox';
const ListItem = props => {
    const { isLoading, sendRequest, error, clearError } = useHttpClient();

    const [showConfirm, setShowConfirm] = useState(false);

    const { displayIcon, displayText, id } = props;

    const showDeleteHandler = () => setShowConfirm(true);
    const cancelDeleteHandler = () => setShowConfirm(false);

    //Delete hospital 
    const confirmDelete = async () => {
        try {
            await sendRequest(
                `https://medical-express.herokuapp.com/api/hospital/delete/?_id=${props.id}`,
                'DELETE',
                null,
            )
            // ฟังก์ชันที่มาจาก HospitalPage ส่งไอดีตัวที่โดนลบทิ้งไปแล้ว เพื่อทำการ filter เอาข้อมูลตัวนั้นออกจาก Array
            props.onDelete(id);
        } catch (err) { }
    }


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />

            {/* Modal แจ้งเตือนเวลาจะลบ */}
            <Modal
                show={showConfirm}
                onCancel={cancelDeleteHandler}
                header="Are you sure"
                footerClass="place-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button danger onClick={confirmDelete}>ลบ</Button>
                        <Button inverse onClick={cancelDeleteHandler}>ไม่ดีกว่า</Button>
                    </React.Fragment>
                }
            >
                <p>อยากจะลบจริง ๆ หรอครับ ? {displayText}</p>
                {isLoading && <LoadingSpinner asOverlay />}
            </Modal>
            {/* ถึงตรงนี้ */}

            { props.mainMenu ? (
                <div className="list listMainMenu">
                    <div className="imageContainer">
                        <img src={"https://cdn.lynda.com/course/534411/534411-637199617732170974-16x9.jpg"} />
                    </div>
                    <h2 className="titleContainer">{displayText}</h2>
                    <ul>
                        {props.moreInfo.map((content) => (
                            <li class="listInMainmenu">
                                <div class="row">
                                    <div class="col-8 mainMenuContent">{content.title}</div>
                                    <div class="col-4">
                                        <Button
                                            to={content.navigate}
                                        >
                                            จัดการ
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {/* <div className="buttonContainer">
                        <Button
                            to={props.to}    
                        >
                            กดคลิก
                        </Button>
                    </div> */}
                </div>
            ):

            <div className="list listDefault">
                <div className="row">
                    <div className="col-4 listIcon">
                        <img src={displayIcon} alt={displayIcon} />
                    </div>
                    <div className="col-8 listText">
                        <Link
                            className="displayAnchor"
                            to={props.to || ''}
                            exact={props.exact}
                        >
                            {displayText}
                        </Link>
                        <br />
                        {id && (
                            <div>
                                <Button size="small" danger onClick={showDeleteHandler}>Delete</Button>
                                <Button size="small" to={`/MainCategory/HospitalEdit/${id}`}>
                                    Edit
                                </Button>
                                <Button size="small" to= {`/MainCategory/Hospital/${id}`}>More</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
                            
            }
           

            {/* {isLoading && <LoadingSpinner asOverlay />} */}
        </React.Fragment>
    );
}

export default ListItem;