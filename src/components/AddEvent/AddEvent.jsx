import React, { useState } from "react";
import { z } from "zod";
import "./AddEvent.css";
import InputComponent from "../InputComponent/InputComponent";

const formSchema = z.object({
  eventName: z.string().min(3, "First name is required"),

  date: z.string().min(3, "Date Of Birth is required"),
});

export default function AddEvent() {
  const [eventDetail, setEventDetail] = useState({
    eventName:'',
    date:''
  });
  const [errors, setErrors] = useState({});
  return (
    <div className="event">
      <div className="eventForm">
        <h2 className=" d-flex justify-content-center fw-bold">Add Event</h2>
        <form>
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
