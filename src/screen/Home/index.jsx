import { useEffect, useRef, useState } from 'react';
import ApplyLeave from './ApplyLeave';
import './Home.css';
import { getLeaveDetails, getEvent } from '../../ApiMethods';
import CalenderHeader from './CalenderHeader';
import Week from './Week';
import Month from './Month';

import { useUser } from '../../useUser';

function Home() {
  const { userToken } = useUser();
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveDetails, setLeaveDetails] = useState([]);
  const [eventDetails, setEventDetails] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startingDay = firstDay.getDay();
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  const monthYear = `${firstDay.toLocaleString('default', {
    month: 'long',
  })} ${year}`;

  const modalRef = useRef(null); // reference to that modal

  useEffect(() => {
    function handleModal(event) {
      // this method check if it has been clicked outside the modal
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLeaveModal(false);
      }
    }
    document.addEventListener('mousedown', handleModal);

    Promise.all([getLeaveDetails(), getEvent()])
      .then((value) => {
        value[0].sort((a, b) => new Date(a.fromDate) - new Date(b.fromDate));
        setLeaveDetails(value[0]);
        setEventDetails(value[1]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userToken]); // used to handle the promise async

  function changeMonth(counter) {
    // method to change month
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + counter);
    setCurrentDate(newDate);
  }

  function handleDateClick() {
    // method to show the Apply leave modal when clicked on date
    if (!showLeaveModal) {
      setShowLeaveModal(true);
    }
  }

  return (
    <>
      <CalenderHeader monthYear={monthYear} changeMonth={changeMonth} />
      <Week />
      <Month
        currentDate={currentDate}
        year={year}
        month={month}
        firstDay={firstDay}
        startingDay={startingDay}
        lastDay={lastDay}
        daysInMonth={daysInMonth}
        handleDateClick={handleDateClick}
        leaveDetails={leaveDetails}
        eventDetails={eventDetails}
      />

      {showLeaveModal && userToken && (
        <>
          <div className="backdrop"></div>
          <ApplyLeave
            modalRef={modalRef}
            currentDate={currentDate}
            setLeaveDetails={setLeaveDetails}
            setShowLeaveModal={setShowLeaveModal}
            year={year}
            month={month}
          />
        </>
      )}
    </>
  );
}

export default Home;
