import React from 'react';

import AdvisorStudentHistoryItem from './AdvisorStudentHistoryItem';


const AdvisorStudentHistoryList = props => {

    const objectId = localStorage.getItem("stuIDFromDB");

    //If no data were send from backend

    if (props.content.length === 0) {
        return (
            <div className="errorText">
                <h2>No History data</h2>
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
                {props.content.filter((item) => {
                    // StudentID
                    return objectId === item.student_id
                })
                    .reverse()
                    .map(contentItem => (
                        <div className="col-12" key={contentItem._id}>
                        <AdvisorStudentHistoryItem
                        id={contentItem._id}
                        patientName={contentItem.PatientProfile.name}
                        HN={contentItem.PatientProfile.HN}
                        Diagnosis={contentItem.Diagnosis}
                        approval={contentItem.approval}
                        currentTime={contentItem.currentTime}
                        />
                        </div>
                        
                    ))
                }
                {/* <HistoryItem/> */}
            </div>
        )
    }
}

export default AdvisorStudentHistoryList;


