import PropTypes from 'prop-types';
import { findPosition } from './findPos';
import LeaveStrip from './LeaveStrip';

export default function LeaveDetails({
  index,
  leaveDetails,
  year,
  month,
  pos,
  set,
}) {
  leaveDetails.forEach((leaveDetail) => {
    if (
      new Date(year, month, index + 1).setHours(0, 0, 0, 0) ==
      new Date(leaveDetail.fromDate).setHours(0, 0, 0, 0)
    ) {
      pos[leaveDetail._id] = findPosition(set);
    }
  });
  return (
    <>
      {leaveDetails.map(({ fromDate, toDate, email, _id, color }, ind) => {
        return (
          <LeaveStrip
            key={ind}
            year={year}
            month={month}
            index={index}
            fromDate={fromDate}
            toDate={toDate}
            pos={pos}
            _id={_id}
            email={email}
            color={color}
            ind={ind}
            set={set}
          />
        ); // this method will return the leave strip
      })}{' '}
    </>
  );
}
LeaveDetails.propTypes = {
  index: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  leaveDetails: PropTypes.array,
  set: PropTypes.instanceOf(Set).isRequired,
  pos: PropTypes.shape({}).isRequired,
};
