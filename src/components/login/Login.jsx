import { useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // Ensure loginCredential is defined correctly (e.g., from form state)

    try {
      const response = await axios.post("http://localhost:3000/login", loginCredential);
      console.log(response);
      localStorage.setItem("authToken", response.data.accessToken);
      console.log(response.data)
      localStorage.setItem('userName',response.data.user.firstName)
      localStorage.setItem('email',response.data.user.email)
      navigate("/home");
      setErrors(false)
    } catch (error) {
      setErrors(true)
    }
  }

  return (
    <div className="container-fluid py-4 backGround">
      <div className="w-50 mx-auto my-3 d-flex justify-content-center logo">
        <div>V</div>acation Tracker
      </div>
      <div className="registartion mx-auto p-3">
        <h1 className=" d-flex justify-content-center">SignUp</h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className=" d-flex flex-wrap gap-2 justify-content-center"
        >
          <div className=" d-flex flex-column justify-content-center mx-4">
            <label className="  m-0">Email:</label>

            <input
              className=" p-1 "
              type="text"
              value={loginCredential.email}
              onChange={(e) =>
                setLoginCredential((data) => ({
                  ...data,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div className=" d-flex flex-column justify-content-center mx-4">
            <label className=" m-0">Password:</label>

            <input
              className=" p-1 "
              type="password"
              value={loginCredential.password}
              onChange={(e) =>
                setLoginCredential((data) => ({
                  ...data,
                  password: e.target.value,
                }))
              }
            />
          </div>
          {errors && (
            <div className=" text-danger">Invalid Email or Passowrd</div>
          )}

          <div className="col-12  my-2 d-flex justify-content-center gap-2 ">
            <input className="btn" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
