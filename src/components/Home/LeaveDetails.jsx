import PropTypes from 'prop-types';

export default function LeaveDetails({ index, leaveDetails, year, month }) {
  return (
    <>
      {Array.isArray(leaveDetails)
        ? leaveDetails.map((leaveDetail, ind) => {
            let returnElement;

            if (
              new Date(year, month, index + 1).setHours(0, 0, 0, 0) >=
                new Date(leaveDetail.fromDate).setHours(0, 0, 0, 0) &&
              new Date(year, month, index + 1).setHours(0, 0, 0, 0) <=
                new Date(leaveDetail.toDate).setHours(0, 0, 0, 0)
            ) {
              returnElement = (
                <div
                  key={ind}
                  className={`leaveStrip`}
                  style={{
                    backgroundColor: `${leaveDetail['color']}`,
                  }}
                >
                  <p className=" text-white">{leaveDetail.email}</p>
                </div>
              );
            }
            return returnElement;
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
