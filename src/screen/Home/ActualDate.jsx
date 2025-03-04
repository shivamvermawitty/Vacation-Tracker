import DateCard from './Date';
import PropTypes from 'prop-types';
import EventDetails from './EventDetails';
import LeaveDetails from './LeaveDetails';
import { useRef } from 'react';
import { useUser } from '../../useUser';

export default function ActualDate({
  handleDateClick,
  currentDate,
  year,
  month,
  daysInMonth,
  leaveDetails,
  eventDetails,
}) {
  const { userToken } = useUser();
  let set = new Set(); // used to provide empty position to leave strip
  let pos = useRef({}); // stores leaveId and its corresponding position
  const weekendArr = [0, 6];

  const getDateClass = (index) => {
    // function to calculate the class name for each date
    const isWeekend = weekendArr.includes(
      new Date(year, month, index + 1).getDay()
    );
    const isCurrentDate =
      currentDate.getDate() === index + 1 &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getFullYear() === new Date().getFullYear();

    return [
      isWeekend ? 'disabledDate' : 'dateCard',
      isCurrentDate ? 'currentDate' : '',
      'eventCard',
    ]
      .filter(Boolean) // Remove empty strings
      .join(' '); // Join with spaces
  };

  return (
    <>
      {new Array(daysInMonth).fill().map((_, index) => (
        <div
          className={getDateClass(index)} // classes for each date
          style={{ cursor: userToken ? 'pointer' : '' }}
          key={index}
          onClick={() => handleDateClick()}
        >
          <EventDetails
            index={index}
            year={year}
            month={month}
            eventDetails={eventDetails}
          />
          <div>
            <DateCard date={index + 1} month={month} year={year} />
          </div>
          <LeaveDetails
            index={index}
            leaveDetails={leaveDetails}
            currentDate={currentDate}
            year={year}
            month={month}
            set={set}
            pos={pos}
          />
        </div>
      ))}
    </>
  );
}

ActualDate.propTypes = {
  handleDateClick: PropTypes.func.isRequired,
  currentDate: PropTypes.instanceOf(Date).isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  daysInMonth: PropTypes.number.isRequired,
  leaveDetails: PropTypes.array,
  eventDetails: PropTypes.array,
};
