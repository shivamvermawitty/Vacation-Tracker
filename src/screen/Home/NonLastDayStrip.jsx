import PropTypes from 'prop-types';

export default function NonLastDayStrip({
  ind,
  isStart,
  year,
  month,
  index,
  fromDate,
  email,
  getStyle,
}) {
  return (
    <div key={ind} className="leaveStrip" style={getStyle(index)}>
      {isStart(year, month, index, fromDate) && (
        <p className=" text-white">{email}</p>
      )}
    </div>
  );
}
NonLastDayStrip.propTypes = {
  ind: PropTypes.number.isRequired,
  isStart: PropTypes.func.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  fromDate: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  getStyle: PropTypes.func.isRequired,
};
