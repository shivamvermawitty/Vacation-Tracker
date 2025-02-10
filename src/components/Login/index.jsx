import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import InputComponent from '../InputComponent';
import { postLoginCred } from '../../ApiMethods';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const [loginCredential, setLoginCredential] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await postLoginCred(loginCredential);
      console.log(7777, response.data);
      localStorage.setItem('authToken', response.data.accessToken);
      navigate('/home');
      setErrors(false);
    } catch (err) {
      console.log(err);
      setErrors(true);
    }
  }

  return (
    <div className="container-fluid py-4 backGround">
      <div className="w-50 mx-auto my-3 d-flex justify-content-center logo">
        <div>V</div>acation Tracker
      </div>
      <div className="registartion mx-auto p-3">
        <h1 className=" d-flex justify-content-center">LogIn</h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className=" d-flex flex-wrap gap-2 justify-content-center"
        >
          <div className=" d-flex flex-column justify-content-center mx-4">
            <InputComponent
              label={'Email:'}
              type={'text'}
              formData={loginCredential}
              name={'email'}
              setFormData={setLoginCredential}
            />
          </div>
          <div className=" d-flex flex-column justify-content-center mx-4">
            <InputComponent
              label={'Password:'}
              type={'password'}
              formData={loginCredential}
              name={'password'}
              setFormData={setLoginCredential}
            />
          </div>
          {errors && (
            <div className=" text-danger">Invalid Email or Passowrd</div>
          )}

          <div className="col-12  my-2 d-flex justify-content-center gap-2 ">
            <Link to="/" className="button" style={{ textDecoration: 'none' }}>
              Register
            </Link>
            <input className="btn" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
