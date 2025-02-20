import PropTypes from 'prop-types';
import { useUser } from '../../useUser';

export default function LeaveDetails({ index, leaveDetails, year, month }) {
  let { c } = useUser();
  // let flag = 0;
  // let temp = 0;
  return (
    <>
      {Array.isArray(leaveDetails)
        ? leaveDetails.map((leaveDetail, ind) => {
            if (
              new Date(year, month, index + 1).setHours(0, 0, 0, 0) ==
              new Date(leaveDetail.fromDate).setHours(0, 0, 0, 0)
            ) {
              console.log(5555);
              const lineBreak = Array.from({ length: c.current }, (_, i) => (
                <br key={i} />
              ));
              const width =
                Math.floor(
                  (new Date(leaveDetail.toDate) -
                    new Date(year, month, index)) /
                    (1000 * 3600 * 24)
                ) > 7
                  ? 7 - new Date(year, month, index + 1).getDay()
                  : Math.floor(
                      (new Date(leaveDetail.toDate) -
                        new Date(year, month, index)) /
                        (1000 * 3600 * 24)
                    );
              c.current++;
              console.log(true);
              return (
                <>
                  {lineBreak}
                  <div
                    key={ind}
                    className={`leaveStrip`}
                    style={{
                      backgroundColor: `${leaveDetail['color']}`,
                      width: `${100 * width}%`,
                    }}
                  >
                    <p className=" text-white">
                      {leaveDetail.email}
                      {c.current}
                    </p>
                  </div>
                </>
              );
            }
            if (
              new Date(year, month, index + 1).setHours(0, 0, 0, 0) ==
              new Date(leaveDetail.toDate).setHours(0, 0, 0, 0)
            ) {
              c.current--;
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
};
