import PropTypes from 'prop-types';
import './InputComponent.css';
export default function InputComponent({
  label,
  type,
  value,
  handleChange,
  errorMessage,
}) {
  return (
    <>
      <div className="d-flex flex-column mx-4">
        <label>{label}</label>
        <input type={type} value={value} onChange={handleChange} />{' '}
        {errorMessage && <span className=" text-danger">{errorMessage}</span>}
      </div>
    </>
  );
}
InputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};
