import PropTypes from 'prop-types';
export default function LeaveDateInput({
  label,
  value,
  handleChange,
  errorMessage,
}) {
  return (
    <>
      <label>{label}</label>
      <input type="date" value={value} onChange={handleChange} /> <br />
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
    </>
  );
}
LeaveDateInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};
