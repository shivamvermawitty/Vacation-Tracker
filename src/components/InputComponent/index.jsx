import PropTypes from 'prop-types';
export default function InputComponent({
  label,
  type,
  formData,
  name,
  setFormData,
  errorMessage,
}) {
  function handleChange(e, propertyName) {
    setFormData((data) => ({ ...data, [propertyName]: e.target.value }));
  }
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        value={formData[name]}
        onChange={(e) => handleChange(e, name)}
      />{' '}
      <br />
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
    </>
  );
}
InputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};
