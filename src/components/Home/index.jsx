import { useEffect, useState, useRef } from 'react';
import DateCard from '../Date';
import ApplyLeave from '../ApplyLeave';
import './Home.css';
import { useUser } from '../../useUser';

function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { leaveDetails, setLeaveDetails, eventDetails } = useUser();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();
  const monthYear = `${firstDay.toLocaleString('default', {
    month: 'long',
  })} ${year}`;
  function changeMonth(counter) {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + counter);
    setCurrentDate(newDate);
  }
  function handleDateClick() {
    if (!showLeaveModal) {
      setShowLeaveModal(true);
    }
  }
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const modalRef = useRef(null);
  useEffect(() => {
    function handleModal(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLeaveModal(false);
      }
    }
    document.addEventListener('mousedown', handleModal);
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
        <div className="dayBox  fw-bold d-flex justify-content-center dayName">
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
            className={` ${new Date(year, month, index + 1).getDay() == 0 ? 'disabledDate' : 'dateCard'} ${new Date(year, month, index + 1).getDay() == 6 ? 'disabledDate' : 'dateCard'} ${
              currentDate.getDate() == index + 1 &&
              currentDate.getMonth() == new Date().getMonth() &&
              currentDate.getFullYear() == new Date().getFullYear()
                ? 'currentDate'
                : ''
            } eventCard`}
            key={index}
            onClick={() => handleDateClick()}
          >
            {Array.isArray(eventDetails)
              ? eventDetails.map((event, i) => {
                  return new Date(year, month, index + 1).setHours(
                    0,
                    0,
                    0,
                    0
                  ) == new Date(event.eventDate).setHours(0, 0, 0, 0) ? (
                    <div
                      className=" d-flex justify-content-center eventDate"
                      key={i}
                    >
                      {event.eventName}
                    </div>
                  ) : null;
                })
              : null}

            <div>
              <DateCard date={index + 1} month={month} year={year} />
            </div>
            {Array.isArray(leaveDetails)
              ? leaveDetails.map((leaveDetail, i) => {
                  return new Date(year, month, index + 1).setHours(
                    0,
                    0,
                    0,
                    0
                  ) >= new Date(leaveDetail.fromDate).setHours(0, 0, 0, 0) &&
                    new Date(year, month, index + 1).setHours(0, 0, 0, 0) <=
                      new Date(leaveDetail.toDate).setHours(0, 0, 0, 0) ? (
                    <div
                      key={i}
                      className={`leaveStrip ${new Date(year, month, index + 1).setHours(0, 0, 0, 0) == new Date(leaveDetail.fromDate).setHours(0, 0, 0, 0) ? 'borderRadiusLeft' : ''} ${new Date(year, month, index + 1).setHours(0, 0, 0, 0) == new Date(leaveDetail.toDate).setHours(0, 0, 0, 0) ? 'borderRadiusRight' : ''}`}
                      style={{ backgroundColor: `${leaveDetail['color']}` }}
                    >
                      {new Date(year, month, index + 1).setHours(0, 0, 0, 0) ==
                      new Date(leaveDetail.fromDate).setHours(0, 0, 0, 0) ? (
                        <p className=" text-white">{leaveDetail.email}</p>
                      ) : (
                        ''
                      )}
                    </div>
                  ) : (
                    ''
                  );
                })
              : ''}
          </div>
        ))}
      </div>
      {showLeaveModal && <div className="backdrop"></div>}
      <div className=" leaveModal">
        {showLeaveModal && (
          <ApplyLeave
            setShowLeaveModal={setShowLeaveModal}
            modalRef={modalRef}
            setUserLeaveDetails={setLeaveDetails}
            month={month}
            year={year}
          />
        )}
      </div>
    </>
  );
}

export default Home;
