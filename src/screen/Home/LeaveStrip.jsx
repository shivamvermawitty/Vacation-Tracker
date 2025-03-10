import { removePosition } from './findPos';
import PropTypes from 'prop-types';

import NonLastDayStrip from './NonLastDayStrip';
import LastDayStrip from './LastDayStrip';

export default function LeaveStrip({
  year,
  month,
  index,
  fromDate,
  toDate,
  pos,
  _id,
  email,
  color,
  ind,
  set,
}) {
  function isStart(year, month, index, fromDate) {
    // method to find if the date is the start day of leave
    return (
      new Date(year, month, index + 1).setHours(0, 0, 0, 0) ==
      new Date(fromDate).setHours(0, 0, 0, 0)
    );
  }

  function isEnd(year, month, index, toDate) {
    // method to find if the date is the end day of leave
    return (
      new Date(year, month, index + 1).setHours(0, 0, 0, 0) ==
      new Date(toDate).setHours(0, 0, 0, 0)
    );
  }

  function isNotLastDayOfLeave(year, month, index, fromDate, toDate) {
    // method to check the date is not the last day of leave
    return (
      new Date(year, month, index + 1).setHours(0, 0, 0, 0) >=
        new Date(fromDate).setHours(0, 0, 0, 0) &&
      new Date(year, month, index + 1).setHours(0, 0, 0, 0) <
        new Date(toDate).setHours(0, 0, 0, 0)
    );
  }
  const getStyle = (index) => {
    // function to calculate the class name for each date
    return {
      backgroundColor: `${color}`, // set backGround Color based on leave user
      top: `${25 * (pos[_id] + 1.2) + 3 * pos[_id]}px`, // top is set based on the position of leave

      borderRadius:
        isStart(year, month, index, fromDate) &&
        isEnd(year, month, index, toDate)
          ? '10px'
          : isStart(year, month, index, fromDate)
            ? '10px 0 0 10px'
            : isEnd(year, month, index, toDate)
              ? '0 10px 10px 0'
              : '',
    };
  };
  return (
    <>
      {isNotLastDayOfLeave(year, month, index, fromDate, toDate) ? (
        <NonLastDayStrip
          ind={ind}
          isStart={isStart}
          year={year}
          month={month}
          index={index}
          fromDate={fromDate}
          isEnd={isEnd}
          toDate={toDate}
          email={email}
          getStyle={getStyle}
        />
      ) : isEnd(year, month, index, toDate) ? (
        <LastDayStrip
          ind={ind}
          pos={pos}
          _id={_id}
          index={index}
          removePosition={removePosition}
          set={set}
          getStyle={getStyle}
        />
      ) : null}
    </>
  );
}

LeaveStrip.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  fromDate: PropTypes.string.isRequired, // Assuming date is passed as a string, adjust if it's a Date object
  toDate: PropTypes.string.isRequired, // Assuming date is passed as a string
  pos: PropTypes.object.isRequired,
  _id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  ind: PropTypes.number.isRequired,
  set: PropTypes.instanceOf(Set).isRequired,
};
