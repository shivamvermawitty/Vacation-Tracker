import { useState, DateCard, ApplyLeave, useRef } from "./index";
import "./Home.css";
import { useEffect } from "react";

function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();
  const monthYear = `${firstDay.toLocaleString("default", {
    month: "long",
  })} ${year}`;
  function changeMonth(counter) {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + counter);
    setCurrentDate(newDate);
  }
  function handleDateClick() {
    if (!showLeaveModal) {
      console.log(month,year)
      setShowLeaveModal(true);
    }
  }

  const [userLeaveDetail,setUserLeaveDetails] = useState([
    {
      color: "#125ed9",
      from: "2024-12-31T00:00:00.000Z",
      to: "2025-01-02T00:00:00.000Z",
      email: "user1@a.com",
    },
    {
      color: "#e91e63",
      from: "2025-01-02T00:00:00.000Z",
      to: "2025-01-05T00:00:00.000Z",
      email: "user2@a.com",
    },
    {
      color: "#ff5722",
      from: "2025-01-05T00:00:00.000Z",
      to: "2025-01-08T00:00:00.000Z",
      email: "user3@a.com",
    },
    {
      color: "#4caf50",
      from: "2025-01-08T00:00:00.000Z",
      to: "2025-01-11T00:00:00.000Z",
      email: "user4@a.com",
    },
    {
      color: "#8bc34a",
      from: "2025-01-11T00:00:00.000Z",
      to: "2025-01-13T00:00:00.000Z",
      email: "user5@a.com",
    },
  ]);

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const modalRef = useRef(null);
  useEffect(() => {
    function handleModal(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLeaveModal(false);
      }
    }
    document.addEventListener("mousedown", handleModal);
  }, []);

  return (
    <>
      <div className="row justify-content-between calenderHeader">
        <h1 className="col-3 fw-bold monthYear">{monthYear}</h1>
        <div className="col-6 d-flex align-items-center justify-content-end gap-2"></div>
        <div className="col-3 d-flex justify-content-center align-items-center fs-1 ">
          <i
            className="fa-solid fa-chevron-left p-1 bg-white rounded m-1 calenderChange"
            onClick={() => changeMonth(-1)}
          ></i>
          <i
            className="fa-solid fa-chevron-right p-1 bg-white rounded calenderChange"
            onClick={() => changeMonth(1)}
          ></i>
        </div>
      </div>
      <div className="weekDays">
        <div className="dayBox text-danger fw-bold d-flex justify-content-center dayName">
          Sunday
        </div>
        <div className="dayBox  fw-bold d-flex justify-content-center dayName" >
          Monday
        </div>
        <div className="dayBox fw-bold d-flex justify-content-center dayName">
          Tuesday
        </div>
        <div className="dayBox fw-bold d-flex justify-content-center dayName">
          Wedneday
        </div>
        <div className="dayBox fw-bold d-flex justify-content-center dayName">
          Thursday
        </div>
        <div className="dayBox fw-bold d-flex justify-content-center dayName">
          Friday
        </div>
        <div className="dayBox fw-bold d-flex justify-content-center dayName">
          Saturday
        </div>
      </div>
      <div className="dateBox row">
        {new Array(startingDay).fill().map((v, index) => (
          <div key={index} className="dateCard">
            <DateCard />
          </div>
        ))}
        {new Array(daysInMonth).fill().map((_, index) => (
          <div
            className={` ${new Date(year, month, index + 1).getDay() == 0 ? "disabledDate" : "dateCard"} ${new Date(year, month, index + 1).getDay() == 6 ? "disabledDate" : "dateCard"} ${
              currentDate.getDate() == index + 1 &&
              currentDate.getMonth() == new Date().getMonth() &&
              currentDate.getFullYear() == new Date().getFullYear()
                ? "currentDate"
                : ""
            }`}
            key={index}
            onClick={() => handleDateClick()}
          >
            <div>
              <DateCard date={index + 1} month={month} year={year} />
            </div>
            {userLeaveDetail.map((leaveDetail, i) => {
            
              return new Date(year, month, index + 1).setHours(0,0,0,0)>= new Date(leaveDetail.from).setHours(0,0,0,0) &&
              new Date(year, month, index + 1).setHours(0,0,0,0)<= new Date(leaveDetail.to).setHours(0,0,0,0) ? (
                <div
                  key={i}
                  className={`leaveStrip ${new Date(year,month,index+1).setHours(0,0,0,0)== new Date(leaveDetail.from).setHours(0,0,0,0)?'borderRadiusLeft':''} ${new Date(year,month,index+1).setHours(0,0,0,0)== new Date(leaveDetail.to).setHours(0,0,0,0)?'borderRadiusRight':''}`}
                  style={{ backgroundColor: `${leaveDetail["color"]}` }}
                >
                  {
                  // console.log(new Date(year,month,index+1).setHours(0,0,0,0)==new Date(leaveDetail.from).setHours(0,0,0,0),new Date(year,month,index+1).setHours(0,0,0,0), new Date(leaveDetail.from).setHours(0,0,0,0))
                  new Date(year,month,index+1).setHours(0,0,0,0)==new Date(leaveDetail.from).setHours(0,0,0,0)?<p>{leaveDetail.email}</p>:''

                  }
                  
                  
                </div>
              ) : (
                ""
              );
            })}
          </div>
        ))}
      </div>
      {showLeaveModal && <div className="backdrop"></div>}
      <div className=" leaveModal">
        {showLeaveModal && (
          <ApplyLeave 
            setShowLeaveModal={setShowLeaveModal}
            modalRef={modalRef}
            setUserLeaveDetails={setUserLeaveDetails}
            month={month}
            year={year}
          />
        )}
      </div>
    </>
  );
}

export default Home;
