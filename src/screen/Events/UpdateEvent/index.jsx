import InputComponent from '../../../components/InputComponent';
import FormHeading from '../../../components/FormHeading';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { validateEventData } from '../AddEvent/validation';
import { getEventById, updateEvent } from '../../../ApiMethods';

export default function UpdateEvent() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [eventDetail, setEventDetail] = useState({
    eventName: '',
    eventDate: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchEventById(id) {
      try {
        const response = await getEventById(id);
        const { eventName, eventDate } = response;
        setEventDetail({
          eventName,
          eventDate: new Date(eventDate).toISOString().split('T')[0],
        });
      } catch (err) {
        console.log('Unable to fetch Event details ', err);
      }
    }
    fetchEventById(id);
  }, []);

  function handleChange(e, propertyName) {
    setEventDetail((event) => ({ ...event, [propertyName]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const result = validateEventData(eventDetail);
    if (!result.valid) {
      setErrors(result.error);
      return;
    }
    try {
      await updateEvent(eventDetail, id);
      setErrors({});
      navigate('/event');
    } catch (err) {
      console.log('Unable to update event', err);
    }
  }
  return (
    <div className="event">
      <div className="eventForm">
        <FormHeading heading="Update Event" />
        <form onSubmit={handleSubmit}>
          <InputComponent
            label="Event Name:"
            type="text"
            value={eventDetail['eventName']}
            handleChange={(e) => handleChange(e, 'eventName')}
            errorMessage={errors.eventName}
          />

          <InputComponent
            label="Date"
            type="date"
            value={eventDetail['eventDate']}
            handleChange={(e) => handleChange(e, 'eventDate')}
            errorMessage={errors.eventDate}
          />
          <div className="buttonDiv">
            <button className="eventSubmitButton" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
