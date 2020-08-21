import React, { useState, useEffect } from "react";

import { Card } from "react-bootstrap";

import { useHttpClient } from '../../../shared/hooks/http-hook';
import AdvisorStudentHistoryList from "./AdvisorStudentHistoryList";



const AdvisorStudentHistory = (props) => {

  const { isLoading, sendRequest } = useHttpClient();

  const [loadedPost, setLoadedPost] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendRequest(`https://medical-express.herokuapp.com/api/post/all`);
        // name of the the key value : place
        setLoadedPost(responseData);
        console.log(responseData);
      } catch (err) {

      }
    }
    fetchPost();
  }, [sendRequest])


  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Text>History</Card.Text>
        </Card.Header>

        {isLoading && (
          <div className="center">
            ทำการโหลดข้อมูล... 
          </div>
        )}

        {!isLoading && loadedPost && (
         <AdvisorStudentHistoryList 
          suid= {props.studentUid}
          content={loadedPost} 
        />
          
        )
        }
        {console.log(loadedPost)}
      </Card>
    </div>
  );
}
export default AdvisorStudentHistory;