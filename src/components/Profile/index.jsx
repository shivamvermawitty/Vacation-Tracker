import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

import { parseFormData } from '../Register/parcer';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../InputComponent';
import Dropdown from '../DropDown';
import FormHeading from '../FormHeading';
import ProjectName from '../ProjectName';
import { updateData } from '../../ApiMethods';
import { useUser } from '../../useUser';

function Profile() {
  const { userDetails, setUserDetails } = useUser();

  const { firstName, lastName, email, password, contact, dob, gender, color } =
    userDetails;

  const [formData, setFormData] = useState({
    firstName,
    lastName,
    email,
    password,
    contact,
    dob: dob ? new Date(dob).toISOString().split('T')[0] : '',
    gender,
    color,
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    const [year, month, day] = formData.dob.split('-');
    const dateObj = new Date(year, month - 1, day);
    setUserDetails({ ...formData, dob: dateObj.toISOString() });
    if (!parseFormData(formData)) {
      try {
        const response = await updateData(formData);
        navigate('/');
        setErrors({});
        console.log('Profile Updated', response);
      } catch (err) {
        console.log('Unable to register User', err);
      }
    } else {
      setErrors(parseFormData(formData));
    }
  }

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
  }, [userDetails]);

  return (
    <div className="container-fluid py-4 backGround">
      <ProjectName />
      <div className="registartion mx-auto p-3 ">
        <FormHeading heading={'User Details'} />

        <form onSubmit={(e) => handleSubmit(e)} className=" d-flex">
          <InputComponent
            label={'First Name:'}
            type={'text'}
            formData={formData}
            name={'firstName'}
            setFormData={setFormData}
            errorMessage={errors.firstName}
          />
          <InputComponent
            label={'Last Name:'}
            type={'text'}
            formData={formData}
            name={'lastName'}
            setFormData={setFormData}
            errorMessage={errors.lastName}
          />
          <InputComponent
            label={'E-mail'}
            type={'text'}
            formData={formData}
            name={'email'}
            setFormData={setFormData}
            errorMessage={errors.email}
          />
          <InputComponent
            label={'Password:'}
            type={'password'}
            formData={formData}
            name={'password'}
            setFormData={setFormData}
            errorMessage={errors.password}
          />

          <InputComponent
            label={'Contact No:'}
            type={'text'}
            formData={formData}
            name={'contact'}
            setFormData={setFormData}
            errorMessage={errors.contact}
          />
          <InputComponent
            label={'D.O.B'}
            type={'date'}
            formData={formData}
            name={'dob'}
            setFormData={setFormData}
            errorMessage={errors.dob}
          />
          <InputComponent
            label={'Color:'}
            type={'color'}
            formData={formData}
            name={'color'}
            setFormData={setFormData}
            errorMessage={errors.color}
          />
          <Dropdown
            label={'Gender:'}
            formData={formData}
            setFormData={setFormData}
            name={'gender'}
            optionArr={['Male', 'Female']}
            errorMessage={errors.gender}
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
