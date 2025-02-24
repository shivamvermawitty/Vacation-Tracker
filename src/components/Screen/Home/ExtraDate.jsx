import DateCard from './Date';
import PropTypes from 'prop-types';

export default function ExtraDate({ startingDay }) {
  // const { currentDate } = useHome();
  // const year = currentDate.getFullYear();
  // const month = currentDate.getMonth();
  // const firstDay = new Date(year, month, 1);
  // const startingDay = firstDay.getDay();
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
