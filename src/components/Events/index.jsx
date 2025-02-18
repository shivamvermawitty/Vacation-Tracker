import { useEffect } from 'react';
import './Events.css';
import { useState } from 'react';
import { deleteEvent, getEvent } from '../../ApiMethods';
import { Link, useNavigate } from 'react-router-dom';

export default function Events() {
  const [eventDetails, seteventDetails] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    async function getDetails() {
      try {
        const response = await getEvent();

        seteventDetails(response);
      } catch (err) {
        console.log('Unable to fetch leave', err);
      }
    }
    getDetails();
  }, [eventDetails]);

  async function handleDelete(id) {
    deleteEvent(id);
    navigate('/event');
  }

  return (
    <div className="eventDiv">
      <div className=" mx-3 d-flex justify-content-end">
        <Link to={'/event/addEvent'} className="addEventBtn">
          Add Event
        </Link>
      </div>
      <h1 className=" d-flex justify-content-center">Events</h1>
      <table className=" d-grid">
        <thead>
          <tr className="row">
            <th className="col-5 d-flex justify-content-center"> Event Name</th>
            <th className=" col-3 d-flex justify-content-center">Date</th>

            <th className=" col-4 d-flex justify-content-center">
              Remove/Update
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(eventDetails)
            ? eventDetails.map((val, ind) => {
                return (
                  <tr className="row" key={ind}>
                    <td className="col-5 d-flex justify-content-center align-items-center">
                      {val.eventName}
                    </td>
                    <td className=" col-3 d-flex justify-content-center align-items-center">
                      {new Date(val.eventDate).toLocaleDateString('en-GB')}
                    </td>
                    <td className=" col-4 d-flex flex-wrap gap-1 justify-content-center align-items-center">
                      {' '}
                      <Link to={`/event/updateEvent/${val._id}`}>
                        Update
                      </Link>{' '}
                      <button
                        onClick={() => handleDelete(val._id)}
                        className="deleteButton"
                      >
                        Delete
                      </button>{' '}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}
