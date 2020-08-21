import React, { useState, useEffect } from "react";

import { Card } from "react-bootstrap";

import { useHttpClient } from '../../shared/hooks/http-hook';
import HistoryList from './HistoryList';


const History = () => {

  const { isLoading, sendRequest } = useHttpClient();

  const [loadedPlaces, setLoadedPlace] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`https://medical-express.herokuapp.com/api/post/all`);
        // name of the the key value : place
        setLoadedPlace(responseData);
        console.log(responseData);
      } catch (err) {

      }
    }
    fetchPlaces();
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

        {!isLoading && loadedPlaces && (
          <HistoryList
            content={loadedPlaces}
          />
        )
        }

      </Card>
    </div>
  );
}
export default History;