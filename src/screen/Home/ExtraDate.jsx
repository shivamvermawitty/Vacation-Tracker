import DateCard from './Date';
import PropTypes from 'prop-types';

export default function ExtraDate({ startingDay }) {
  return (
    <>
      {new Array(startingDay).fill().map((v, index) => (
        <div key={index} className="disabledDate">
          <DateCard />
        </div>
      ))}
    </>
  );
}
ExtraDate.propTypes = {
  startingDay: PropTypes.number.isRequired,
};
