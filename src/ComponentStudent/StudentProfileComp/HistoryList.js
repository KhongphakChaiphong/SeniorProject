import React from 'react';

import HistoryItem from './HistoryItem';
import './HistoryList.css'

const HistoryList = props => {

    const objectId = localStorage.getItem("stu_id");

    //If no data were send from backend

    if (props.content.length === 0) {
        return (
            <div className="errorText">
                <h2>No hospital data</h2>
            </div>
        )
    }
    // If able receive data from backend
    else {
        return (
            <div style={{
                position: 'relative',
                height: '300px',
                overflow: 'scroll',
            }}>
                {props.content.filter(id => {
                    // StudentID
                    return id.student_id === objectId
                })
                    .reverse()
                    .map(content => (
                        <div className="col-12" key={content._id}>
                            <HistoryItem
                                id={content._id}
                                patientName={content.PatientProfile.name}
                                HN={content.PatientProfile.HN}
                                Diagnosis={content.Diagnosis}
                                approval={content.approval}
                                currentTime={content.currentTime}
                            />

                        </div>
                    ))
                }
                {/* <HistoryItem/> */}
            </div>
        )
    }
}

export default HistoryList;