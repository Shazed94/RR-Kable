import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { BACKEND_BASE_URL } from '../../Component/GlobalVariables';
import Parse from "html-react-parser";

const EventDetails = () => {

    const { eventId } = useParams();
        //=================================== Fetch News Details ===================================

  const [singleEventInfo, setSingleEventInfo] = useState([]);
  const AllEvent = () => {
    try {
      axios.get(`${BACKEND_BASE_URL}/api/events/${eventId}`).then((res) => {
        setSingleEventInfo(res.data.singleEvent);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AllEvent();
  }, []);

    return (
        <div>
            <Card className="w-100 border-0 transition_ease_io">
                <Card.Img  className="rounded-0" variant="top" src={`${BACKEND_BASE_URL}/${singleEventInfo.image}`} alt='news'/>
                <Card.Body className="px-0">
                    <Card.Title className='f_bold'>{singleEventInfo.title}</Card.Title>
                    <Card.Text className="f_medium text-muted">
                    {Parse(`${singleEventInfo.description}`)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default EventDetails;