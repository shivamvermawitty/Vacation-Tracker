import InputComponent from '../InputComponent';
import FormHeading from '../FormHeading';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { parceFormData } from '../AddEvent/parcer';
import { getEventById, updateEvent } from '../../ApiMethods';

export default function UpdateEvent() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [eventDetail, setEventDetail] = useState({
    eventName: '',
    eventDate: '',
  });
  const [errors, setErrors] = useState({});
  async function handleSubmit(e) {
    e.preventDefault();
    if (!parceFormData(eventDetail)) {
      try {
        await updateEvent(eventDetail, id);
        setErrors({});
        navigate('/event');
      } catch (err) {
        console.log('Unable to update event', err);
      }
    } else {
      setErrors(parceFormData(eventDetail));
    }
  }
  useEffect(() => {
    async function fetchEventById(id) {
      try {
        const response = await getEventById(id);
        setEventDetail({
          eventName: response.eventName,
          eventDate: new Date(response.eventDate).toISOString().split('T')[0],
        });
      } catch (err) {
        console.log('Unable to fetch Event details ', err);
      }
    }
    fetchEventById(id);
  }, []);
  return (
    <div className="event">
      <div className="eventForm">
        <FormHeading heading={'Update Event'} />
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
