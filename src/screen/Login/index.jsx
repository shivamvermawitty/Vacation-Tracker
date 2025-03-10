import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { validateLoginData } from './validation';
import InputComponent from '../../components/InputComponent';
import FormHeading from '../../components/FormHeading';
import ProjectName from '../../components/ProjectName';
import { postLoginCred } from '../../ApiMethods';
import { useState } from 'react';
import { useUser } from '../../useUser';
import { setStorage } from '../../storageMethod';

function Login() {
  const { setUserDetails, setUserToken } = useUser();
  const navigate = useNavigate();
  const [loginCredential, setLoginCredential] = useState({
    email: '',
    password: '',
  }); // login credential state

  const [errors, setErrors] = useState(null);
  const [serverError, setServerError] = useState(false);

  function handleChange(e, propertyName) {
    //  login input change handler
    setLoginCredential((credential) => ({
      ...credential,
      [propertyName]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    // login credential submit handler
    e.preventDefault();
    const result = validateLoginData(loginCredential);
    if (!result.valid) {
      // setting errors when the parsing fails
      setErrors(result.error);
      return;
    }

    try {
      const response = await postLoginCred(loginCredential); // calling login api
      const accessToken = response.data.accessToken;
      setUserToken(accessToken);
      setStorage('authToken', accessToken);
      setUserDetails({ email: loginCredential.email });
      setErrors(null);
      setServerError(false);
      navigate('/');
    } catch (err) {
      console.log('Invalid Credentials', err);
      setServerError(true);
    }
  }

  return (
    <div className="registrationBg">
      <div className="container-fluid py-4 backGround">
        <ProjectName />
        <div className="registartion mx-auto p-3">
          <FormHeading heading="LogIn" />
          <form onSubmit={(e) => handleSubmit(e)} className="  gap-2 ">
            <InputComponent
              label="Email:"
              type="text"
              value={loginCredential['email']}
              handleChange={(e) => handleChange(e, 'email')}
              errorMessage={errors?.email}
            />

            <InputComponent
              label="Password:"
              type="password"
              value={loginCredential['password']}
              handleChange={(e) => handleChange(e, 'password')}
              errorMessage={errors?.password}
            />
            {serverError && (
              <div className=" text-danger">Invalid Email or Passowrd</div>
            )}

            <div className="col-12  my-2 d-flex justify-content-center align-items-center gap-2 ">
              <Link
                to="/register"
                className="registerButton"
                style={{ textDecoration: 'none' }}
              >
                Register
              </Link>
              <input className="btn" type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
