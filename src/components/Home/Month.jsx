import PropTypes from 'prop-types';
import DateCard from '../Date';

export default function Month({
  startingDay,
  daysInMonth,
  year,
  month,
  currentDate,
  eventDetails,
  leaveDetails,
  handleDateClick,
}) {
  return (
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
                return new Date(year, month, index + 1).setHours(0, 0, 0, 0) ==
                  new Date(event.eventDate).setHours(0, 0, 0, 0) ? (
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
                return new Date(year, month, index + 1).setHours(0, 0, 0, 0) >=
                  new Date(leaveDetail.fromDate).setHours(0, 0, 0, 0) &&
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
  );
}

Month.propTypes = {
  startingDay: PropTypes.number.isRequired,
  daysInMonth: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  currentDate: PropTypes.instanceOf(Date),
  eventDetails: PropTypes.array,
  leaveDetails: PropTypes.array,
  handleDateClick: PropTypes.func.isRequired,
};
