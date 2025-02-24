import { useEffect, useRef, useState } from 'react';
import ApplyLeave from './ApplyLeave';
import './Home.css';
import { getLeaveDetails, getEvent } from '../../../ApiMethods';
import CalenderHeader from './CalenderHeader';
import Week from './Week';
import Month from './Month';
import { getStorage } from '../../../storageMethod';

function Home() {
  // const {
  //   setLeaveDetails,
  //   setEventDetails,
  //   currentDate,
  //   setCurrentDate,
  //   showLeaveModal,
  //   setShowLeaveModal,
  // } = useHome();
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

  const modalRef = useRef(null);
  useEffect(() => {
    function handleModal(event) {
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
  }, []);

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

      {showLeaveModal && getStorage('authToken') && (
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
