import { useState } from 'react';
import { z } from 'zod';
import './AddEvent.css';
import InputComponent from '../InputComponent';
import FormHeading from '../FormHeading';
import { useNavigate } from 'react-router-dom';
import { postEvent } from '../../ApiMethods';

const formSchema = z.object({
  eventName: z.string().min(3, 'First name is required'),

  eventDate: z.string().min(3, 'Date Of Birth is required'),
});

export default function AddEvent() {
  const navigate = useNavigate();
  const [eventDetail, setEventDetail] = useState({
    eventName: '',
    eventDate: '',
  });
  const [errors, setErrors] = useState({});
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      formSchema.parse(eventDetail);
      await postEvent(eventDetail);
      setErrors({});
      navigate('/home');
    } catch (err) {
      console.log('Unable to parse data', err);
    }
  }
  return (
    <div className="event">
      <div className="eventForm">
        <FormHeading heading={'Add Event'} />
        <form onSubmit={handleSubmit}>
          <InputComponent
            label={'Event Name:'}
            type={'text'}
            formData={eventDetail}
            name={'eventName'}
            setFormData={setEventDetail}
            errorMessage={errors.eventName}
          />

          <InputComponent
            label={'Date:'}
            type={'date'}
            formData={eventDetail}
            name={'eventDate'}
            setFormData={setEventDetail}
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
