import React from "react";
import './ApplyLeave.css'

export default function ApplyLeave({modalRef}) {
  return (
    <div
    className="leave"
    ref={modalRef}
    >
      <h2>Apply Leave</h2>

      <form className=" d-flex flex-column justify-content-center">
        <div className=" d-flex justify-content-between align-items-center gap-1">
          <label>From Date:</label>
          <input type="date" />
        </div>
        
        <div  className=" d-flex justify-content-between align-items-center gap-1">
          <label>To Date:</label>
          <input type="date" />
        </div>
        <br />
        <div>
          <button type="submit" className="submitButton">Submit</button>
        </div>
      </form>
    </div>
  );
}
