import { useEffect } from 'react';
import './Events.css';
import { useState } from 'react';
import { deleteEvent, getEvent } from '../../ApiMethods';
import { Link } from 'react-router-dom';
import LeaveRow from './LeaveRow';

export default function Events() {
  const [eventDetails, setEventDetails] = useState([]);
  useEffect(() => {
    getDetails();
  }, []);
  async function getDetails() {
    try {
      const response = await getEvent();
      setEventDetails(response);
    } catch (err) {
      console.log('Unable to fetch leave', err);
    }
  }

  async function handleDelete(id) {
    const bool = confirm('Confirm to delete');
    if (!bool) return;
    try {
      await deleteEvent(id);
      getDetails();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  }

  return (
    <div className="eventDiv">
      <div className=" mx-3 d-flex justify-content-end">
        <Link to="/event/addEvent" className="addEventBtn">
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
          {eventDetails.map(({ eventName, eventDate, _id }, ind) => (
            <LeaveRow
              key={ind}
              eventDate={eventDate}
              eventName={eventName}
              _id={_id}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
