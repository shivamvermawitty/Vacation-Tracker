import React, { useState ,useContext } from "react";
import { z } from "zod";
import "./AddEvent.css";
import InputComponent from "../InputComponent/InputComponent";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  eventName: z.string().min(3, "First name is required"),

  date: z.string().min(3, "Date Of Birth is required"),
});

export default function AddEvent() {
  const { userDetails, setUserDetails, leaveDetails, setLeaveDetails ,eventDetails , setEventDetails} =
    useContext(UserContext);
    const navigate=useNavigate()
  const [eventDetail, setEventDetail] = useState({
    eventName:'',
    date:''
  });
  const [errors, setErrors] = useState({});
  function handleSubmit(e){
    e.preventDefault()
    console.log(eventDetail)
    setEventDetails(event=>([...event , eventDetail]))
    navigate('/home')
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
            name={"date"}
            setFormData={setEventDetail}
            errorMessage={errors.date}
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
