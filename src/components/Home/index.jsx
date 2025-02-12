import { useEffect, useState, useRef } from 'react';
import ApplyLeave from '../ApplyLeave';
import './Home.css';
import { getLeaveDetails } from '../../ApiMethods';
import { getEvent } from '../../ApiMethods';
import CalenderHeader from './CalenderHeader';
import Week from './Week';
import Month from './Month';

function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  // const { leaveDetails, setLeaveDetails, eventDetails } = useUser();
  const [leaveDetails, setLeaveDetails] = useState();
  const [eventDetails, setEventDetails] = useState();
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
    // async function fetchLeaveDetail() {
    //   try {
    //     const response = await getLeaveDetails();
    //     setLeaveDetails(response);
    //   } catch (err) {
    //     console.log('Error Fetching data', err);
    //   }
    // }
    // async function fetchEventDetails() {
    //   try {
    //     const response = await getEvent();
    //     console.log(response);
    //     setEventDetails(response);
    //   } catch (err) {
    //     console.log('Error Fetching Event Details', err);
    //   }
    // }
    // fetchEventDetails();
    // fetchLeaveDetail()

    Promise.all([getLeaveDetails(), getEvent()])
      .then((value) => {
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
        startingDay={startingDay}
        daysInMonth={daysInMonth}
        year={year}
        month={month}
        currentDate={currentDate}
        eventDetails={eventDetails}
        leaveDetails={leaveDetails}
        handleDateClick={handleDateClick}
      />
      {showLeaveModal && <div className="backdrop"></div>}

      {showLeaveModal && (
        <ApplyLeave
          setShowLeaveModal={setShowLeaveModal}
          modalRef={modalRef}
          setUserLeaveDetails={setLeaveDetails}
          month={month}
          year={year}
        />
      )}
    </>
  );
}

export default Home;
