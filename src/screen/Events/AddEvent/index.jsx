import { useState } from 'react';
import './AddEvent.css';
import InputComponent from '../../../components/InputComponent';
import FormHeading from '../../../components/FormHeading';
import { useNavigate } from 'react-router-dom';
import { postEvent } from '../../../ApiMethods';
import { validateEventData } from './parcer';

export default function AddEvent() {
  const navigate = useNavigate();
  const [eventDetail, setEventDetail] = useState({
    eventName: '',
    eventDate: '',
  });
  const [errors, setErrors] = useState({});
  function handleChange(e, propertyName) {
    setEventDetail((data) => ({ ...data, [propertyName]: e.target.value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const result = validateEventData(eventDetail);
    if (!result.success) {
      const errorObj = {};
      result.error.errors.forEach((error) => {
        errorObj[error.path[0]] = error.message;
      });
      setErrors(errorObj);
      return;
    }

    try {
      await postEvent(eventDetail);
      setErrors({});
      navigate('/event');
    } catch (err) {
      console.log('Unable to post event', err);
    }
  }
  return (
    <div className="event">
      <div className="eventForm">
        <FormHeading heading="Add Event" />
        <form onSubmit={handleSubmit}>
          <InputComponent
            label="Event Name:"
            type="text"
            value={eventDetail['eventName']}
            handleChange={(e) => handleChange(e, 'eventName')}
            errorMessage={errors.eventName}
          />
          <InputComponent
            label="Date:"
            type="date"
            value={eventDetail['eventDate']}
            handleChange={(e) => handleChange(e, 'eventDate')}
            errorMessage={errors.eventName}
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
