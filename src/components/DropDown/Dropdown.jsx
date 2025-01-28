import React from "react";

export default function Dropdown({ formData, setFormData, name, optionArr }) {
  function handleChange(e, propertyName) {
    setFormData((data) => ({ ...data, [propertyName]: e.target.value }));
  }

  return (
    <select value={formData.gender} onChange={(e) => handleChange(e, name)}>
      <option value="" disabled>
        Select {name}
      </option>
      {optionArr.map((options , index) => (
        <option value={options} key={index}>{options}</option>
      ))}
    </select>
  );
}
