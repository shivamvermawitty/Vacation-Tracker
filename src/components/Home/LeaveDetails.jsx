import PropTypes from 'prop-types';
// import { useUser } from '../../useUser'
import { findPosition, removePosition } from './findPos';
export default function LeaveDetails({
  index,
  leaveDetails,
  year,
  month,
  pos,
  set,
}) {
  // const { pos, set } = useUser()
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
      {Array.isArray(leaveDetails)
        ? leaveDetails.map((leaveDetail, ind) => {
          const isStart=new Date(year, month, index + 1).setHours(0, 0, 0, 0) ==
          new Date(leaveDetail.fromDate).setHours(0, 0, 0, 0);
          const isEnd=new Date(year, month, index + 1).setHours(0, 0, 0, 0) ==
          new Date(leaveDetail.toDate).setHours(0, 0, 0, 0)
            if (
              new Date(year, month, index + 1).setHours(0, 0, 0, 0) >=
                new Date(leaveDetail.fromDate).setHours(0, 0, 0, 0) &&
              new Date(year, month, index + 1).setHours(0, 0, 0, 0) <
                new Date(leaveDetail.toDate).setHours(0, 0, 0, 0)
            ) {
              return (
                <div
                  key={ind}
                  className={`leaveStrip`}
                  style={{
                    backgroundColor: `${leaveDetail['color']}`,
                    top: `${25 * (pos[leaveDetail._id]+1.2)}px`,
                    borderRadius:isStart && isEnd?'10px':isStart? '10px 0 0 10px': isEnd?'0 10px 10px 0':''
                  }}
                >
                  {isStart && <p className=" text-white">{leaveDetail.email}</p>}
                </div>
              );
            } else if (
              new Date(year, month, index + 1).setHours(0, 0, 0, 0) ==
              new Date(leaveDetail.toDate).setHours(0, 0, 0, 0)
            ) {
              const el = (
                <div
                  key={ind}
                  className={`leaveStrip`}
                  style={{
                    backgroundColor: `${leaveDetail['color']}`,
                    top: `${25 * (pos[leaveDetail._id]+1.2 )}px`,
                    borderRadius: isEnd?'0 10px 10px 0':''
                  }}
                >
                </div>
              );
              removePosition(set, leaveDetail._id, pos);
              return el;
            }
          })
        : ''}
    </>
  );
}
LeaveDetails.propTypes = {
  index: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  leaveDetails: PropTypes.array,
  set: PropTypes.instanceOf(Set).isRequired, // set is expected to be a Set
  pos: PropTypes.shape({}).isRequired,
};
