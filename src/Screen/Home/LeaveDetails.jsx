import PropTypes from 'prop-types';
import { findPosition } from './findPos';
import { generateLeaveStrip } from './leaveHealper';

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
        return generateLeaveStrip(
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
          set
        );
      })}
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
