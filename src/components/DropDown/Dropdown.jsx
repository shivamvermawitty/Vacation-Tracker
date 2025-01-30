import React from "react";

export default function Dropdown({ label,formData, setFormData, name, optionArr , errorMessage }) {
  function handleChange(e, propertyName) {
    setFormData((data) => ({ ...data, [propertyName]: e.target.value }));
  }
  return (
    <>
    <label>{label}</label>
    <select value={formData.gender} onChange={(e) => handleChange(e, name)}>
      <option value="" disabled>
        Select {name}
      </option>
      {optionArr.map((options , index) => (
        <option value={options} key={index}>{options}</option>
      ))}
    </select>
    {
      errorMessage && <div className="text-danger">{errorMessage}</div>
    }
    </>
  );
}
