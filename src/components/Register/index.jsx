// import { useState, Link, useNavigate, InputComponent, Dropdown, registerData,z } from './index';
import { useState } from 'react';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';

import InputComponent from '../InputComponent';
import Dropdown from '../DropDown';

import { postLoginCred, registerData } from '../../ApiMethods';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';

const formSchema = z.object({
  firstName: z.string().min(3, 'First name is required'),
  lastName: z.string().min(3, 'Last name is required'),
  password: z.string().min(4, 'Invalid Password'),
  email: z.string().email('Invalid email address'),
  contact: z.string().min(10, 'Invalid Contact Number'),
  dob: z.string().min(3, 'Date Of Birth is required'),
  gender: z.string().min(4, 'Gender is required'),
  color: z.string().min(4, 'Invalid color'),
});

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    contact: '',
    dob: '',
    gender: '',
    color: '#ffffff',
  });
  const [errors, setErrors] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      formSchema.parse(formData);
      try {
        await registerData(formData);
        setErrors({});
        console.log('User Registered');
        try {
          const response = await postLoginCred({
            email: formData.email,
            password: formData.password,
          });
          localStorage.setItem('authToken', response.data.accessToken);
          navigate('/home');
        } catch (err) {
          console.log('Unable to post login Cred', err);
        }
      } catch (err) {
        console.log('Unable to register User', err);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorObj = {};
        err.errors.forEach((error) => {
          errorObj[error.path[0]] = error.message;
        });
        setErrors(errorObj);
      }
    }
  }

  return (
    <div className="container-fluid py-4 backGround">
      <div className="w-50 mx-auto my-3 d-flex justify-content-center logo">
        <div>V</div>acation Calender
      </div>
      <div className="registartion mx-auto p-3">
        <h1 className=" d-flex justify-content-center">SignUp</h1>
        <div className=" formDiv">
          <form onSubmit={(e) => handleSubmit(e)} className=" gap-2 ">
            <div className="d-flex flex-column  mx-4">
              <InputComponent
                label={'First Name:'}
                type={'text'}
                formData={formData}
                name={'firstName'}
                setFormData={setFormData}
                errorMessage={errors.firstName}
              />
            </div>
            <div className=" d-flex flex-column  mx-4">
              <InputComponent
                label="Last Name:"
                type={'text'}
                formData={formData}
                name={'lastName'}
                setFormData={setFormData}
                errorMessage={errors.lastName}
              />
            </div>
            <div className="d-flex flex-column  mx-4">
              <InputComponent
                label="E-mail:"
                type={'text'}
                formData={formData}
                name={'email'}
                setFormData={setFormData}
                errorMessage={errors.email}
              />
            </div>

            <div className=" d-flex flex-column mx-4">
              <InputComponent
                label={'Password:'}
                type={'password'}
                formData={formData}
                name={'password'}
                setFormData={setFormData}
                errorMessage={errors.password}
              />
            </div>

            <div className="d-flex flex-column mx-4">
              <InputComponent
                label={'Contact No.:'}
                type={'text'}
                formData={formData}
                name={'contact'}
                setFormData={setFormData}
                errorMessage={errors.contact}
              />
            </div>
            <div className="d-flex flex-column mx-4">
              <InputComponent
                label={'D.O.B'}
                type={'date'}
                formData={formData}
                name={'dob'}
                setFormData={setFormData}
                errorMessage={errors.dob}
              />
            </div>
            <div className="d-flex flex-column mx-4">
              <InputComponent
                label={'Color:'}
                type={'color'}
                formData={formData}
                name={'color'}
                setFormData={setFormData}
                errorMessage={errors.color}
              />
            </div>
            <div className="d-flex flex-column mx-4">
              <Dropdown
                label={'Gender:'}
                formData={formData}
                setFormData={setFormData}
                name={'gender'}
                optionArr={['Male', 'Female']}
                errorMessage={errors.gender}
              />
            </div>
            <div className=" col-5 my-2 d-flex gap-2 ">
              <input className="btn " type="submit" value="Register" />
              <Link
                to="/Login"
                className="btn loginButton d-flex align-items-center"
              >
                LogIn
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
