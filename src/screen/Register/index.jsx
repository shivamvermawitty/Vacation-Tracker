import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProjectName from '../../components/ProjectName';
import InputComponent from '../../components/InputComponent';
import Dropdown from '../../components/DropDown';
import { validateUserData } from './parcer';
import { registerData } from '../../ApiMethods';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import FormHeading from '../../components/FormHeading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [errors, setErrors] = useState(null);

  function handleChange(e, propertyName) {
    // form input change handler
    setFormData((user) => ({ ...user, [propertyName]: e.target.value }));
  }

  async function handleSubmit(e) {
    // form submit handler
    e.preventDefault();
    const result = validateUserData(formData);

    if (!result.success) {
      // sets up the error state when the form data is not valid
      const errorObj = {};
      result.error.errors.forEach((error) => {
        errorObj[error.path[0]] = error.message;
      });
      setErrors(errorObj);
      return;
    }

    try {
      await registerData(formData); // register api call
      setErrors(null);
      alert('User Registered');
      navigate('/login');
    } catch (err) {
      console.log('Unable to register User', err);
      toast.error('Please Enter Valid Details'); // Show error toast
    }
  }

  return (
    <div className="registrationBg">
      <div className="container-fluid py-4 backGround">
        <ProjectName />
        <div className="registartion mx-auto p-3">
          <FormHeading heading="SignUp" />
          <form onSubmit={(e) => handleSubmit(e)} className=" gap-2 ">
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

            <div className=" width d-flex mx-4 align-items-center">
              <input type="submit" value="Register" />
              <Link
                to="/Login"
                className="loginButton d-flex align-items-center"
              >
                LogIn
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />{' '}
      {/* Add ToastContainer here to render the toast messages */}
    </div>
  );
}

export default Register;
