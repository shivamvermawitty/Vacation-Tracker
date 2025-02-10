import PropTypes from 'prop-types';
export default function Date({ date }) {
  return (
    <>
      <span>{date}</span>
    </>
  );
}

Date.propTypes = {
  date: PropTypes.number,
};
