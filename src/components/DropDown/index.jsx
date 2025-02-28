import PropTypes from 'prop-types';
export default function Dropdown({
  label,
  value,
  handleChange,
  optionArr,
  errorMessage,
}) {
  return (
    <>
      <div className="d-flex flex-column mx-4">
        <label>{label}</label>
        <select value={value} onChange={handleChange}>
          <option value="" disabled>
            Select
          </option>
          {optionArr.map((options, index) => (
            <option value={options} key={index}>
              {options}
            </option>
          ))}
        </select>
        {errorMessage && <span className="text-danger">{errorMessage}</span>}
      </div>
    </>
  );
}
Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  optionArr: PropTypes.array.isRequired,
  errorMessage: PropTypes.string,
};
