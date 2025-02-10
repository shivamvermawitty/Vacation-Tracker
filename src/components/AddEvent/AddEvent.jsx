import { useState ,useContext } from "react";
import { z } from "zod";
import "./AddEvent.css";
import InputComponent from "../InputComponent/InputComponent";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { postEvent } from "../../ApiMethods";

const formSchema = z.object({
  eventName: z.string().min(3, "First name is required"),

  eventDate: z.string().min(3, "Date Of Birth is required"),
});

export default function AddEvent() {
  const { setEventDetails} =
    useContext(UserContext);
    const navigate=useNavigate()
  const [eventDetail, setEventDetail] = useState({
    eventName:'',
    eventDate:'',
    // eventDescription:''
  });
  const [errors, setErrors] = useState({});
  async function handleSubmit(e){
    e.preventDefault()
    try{
      formSchema.parse(eventDetail)
      await postEvent(eventDetail)
      setEventDetails(event=>([...event , eventDetail]))
      setErrors({})
    navigate('/home')
    }
    catch(err){
      console.log('Unable to parse data' , err)
    }
  }
  return (
    <div className="event">
      <div className="eventForm">
        <h2 className=" d-flex justify-content-center fw-bold">Add Event</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <InputComponent
            label={'Event Name:'}
            type={"text"}
            formData={eventDetail}
            name={"eventName"}
            setFormData={setEventDetail}
            errorMessage={errors.eventName}
            />
          </div>
          
          <div>
            <InputComponent
            label={'Date:'}
            type={"date"}
            formData={eventDetail}
            name={"eventDate"}
            setFormData={setEventDetail}
            errorMessage={errors.eventDate}
            />
          </div>
          <div>
            <button className="eventSubmitButton" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
