import './Profile.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUserData } from '../Register/validation';
import InputComponent from '../../components/InputComponent';
import Dropdown from '../../components/DropDown';
import FormHeading from '../../components/FormHeading';
import ProjectName from '../../components/ProjectName';
import { updateData } from '../../ApiMethods';
import { useUser } from '../../useUser';

function Profile() {
  const { userDetails, setUserDetails } = useUser();

  const { firstName, lastName, email, password, contact, dob, gender, color } =
    userDetails ?? {}; // Destructuring userDetails Data

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const [errors, setErrors] = useState(null);

  useEffect(() => {
    setFormData({
      firstName,
      lastName,
      email,
      password,
      contact,
      dob: dob ? new Date(dob).toISOString().split('T')[0] : '',
      gender,
      color,
    });
  }, [firstName, lastName, email, password, contact, dob, gender, color]);

  function handleChange(e, propertyName) {
    // Form  Value Change Method
    console.log(e.target.value);
    setFormData((user) => ({ ...user, [propertyName]: e.target.value }));
  }

  async function handleSubmit(e) {
    // Form Submit Method
    e.preventDefault();
    const [year, month, day] = formData.dob.split('-');
    const dateObj = new Date(year, month - 1, day);
    setUserDetails({ ...formData, dob: dateObj.toISOString() });
    const result = validateUserData(formData);

    if (!result.valid) {
      // setting Errors when parsing form data returns false
      setErrors(result.error);
      return;
    }
    try {
      const response = await updateData(formData); // updating user Data
      setErrors(null);
      console.log('Profile Updated', response);
      navigate('/');
    } catch (err) {
      console.log('Unable to register User', err);
    }
  }

  return (
    <div className="container-fluid py-4 backGround">
      <ProjectName />
      <div className="registartion mx-auto p-3 ">
        <FormHeading heading="User Details" />

        <form onSubmit={(e) => handleSubmit(e)} className=" d-flex">
          <InputComponent
            label="First Name:"
            type="text"
            value={formData['firstName']}
            handleChange={(e) => handleChange(e, 'firstName')}
            errorMessage={errors?.firstName}
          />
          <InputComponent
            label="Last Name:"
            type="text"
            value={formData['lastName']}
            handleChange={(e) => handleChange(e, 'lastName')}
            errorMessage={errors?.lastName}
          />
          <InputComponent
            label="E-mail"
            type="text"
            value={formData['email']}
            handleChange={(e) => handleChange(e, 'email')}
            errorMessage={errors?.email}
          />
          <InputComponent
            label="Password:"
            type="password"
            value={formData['password']}
            handleChange={(e) => handleChange(e, 'password')}
            errorMessage={errors?.password}
          />

          <InputComponent
            label="Contact No:"
            type="text"
            value={formData['contact']}
            handleChange={(e) => handleChange(e, 'contact')}
            errorMessage={errors?.contact}
          />
          <InputComponent
            label="D.O.B"
            type="date"
            value={formData['dob']}
            handleChange={(e) => handleChange(e, 'dob')}
            errorMessage={errors?.dob}
          />
          <InputComponent
            label="Color:"
            type="color"
            value={formData['color']}
            handleChange={(e) => handleChange(e, 'color')}
            errorMessage={errors?.color}
          />
          <Dropdown
            label="Gender:"
            value={formData['gender']}
            handleChange={(e) => handleChange(e, 'gender')}
            optionArr={['Male', 'Female']}
            errorMessage={errors?.gender}
          />
          <div className="mx-4 width">
            <input type="submit" className="fw-bold my-3" value="Update" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
