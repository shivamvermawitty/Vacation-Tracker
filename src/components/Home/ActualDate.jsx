import DateCard from '../Date';
import PropTypes from 'prop-types';
import EventDetails from './EventDetails';
import LeaveDetails from './LeaveDetails';

export default function ActualDate({
  handleDateClick,
  currentDate,
  year,
  month,
  daysInMonth,
  leaveDetails,
  eventDetails,
}) {
  return (
    <>
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
          />
        </div>
      ))}
    </>
  );
}
ActualDate.propTypes = {
  handleDateClick: PropTypes.func.isRequired,
  currentDate: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  daysInMonth: PropTypes.number.isRequired,
  leaveDetails: PropTypes.object.isRequired,
  eventDetails: PropTypes.object.isRequired,
};
