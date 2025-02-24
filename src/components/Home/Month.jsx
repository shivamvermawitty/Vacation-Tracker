import PropTypes from 'prop-types';
import ExtraDate from './ExtraDate';
import ActualDate from './ActualDate';

export default function Month({
  handleDateClick,
  currentDate,
  year,
  month,
  firstDay,
  startingDay,
  daysInMonth,
  lastDay,
  leaveDetails,
  eventDetails,
}) {
  return (
    <div className="row calender">
      <ExtraDate
        currentDate={currentDate}
        year={year}
        month={month}
        firstDay={firstDay}
        startingDay={startingDay}
      />
      <ActualDate
        currentDate={currentDate}
        year={year}
        month={month}
        lastDay={lastDay}
        daysInMonth={daysInMonth}
        leaveDetails={leaveDetails}
        eventDetails={eventDetails}
        handleDateClick={handleDateClick}
      />
    </div>
  );
}

Month.propTypes = {
  handleDateClick: PropTypes.func.isRequired,
  currentDate: PropTypes.instanceOf(Date).isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  firstDay: PropTypes.instanceOf(Date).isRequired,
  startingDay: PropTypes.number.isRequired,
  daysInMonth: PropTypes.number.isRequired,
  lastDay: PropTypes.instanceOf(Date).isRequired,
  leaveDetails: PropTypes.array,
  eventDetails: PropTypes.array,
};
