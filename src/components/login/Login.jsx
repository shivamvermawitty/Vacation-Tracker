import { useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loginCredential, setLoginCredential] = useState({
    userName: "",
    password: "",
  });

  const [errors, setErrors] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (
      userData.userName === loginCredential.userName &&
      userData.password === loginCredential.password
    ) {
      navigate("/profile");
    } else {
      setErrors(true);
    }
  }

  return (
    <div className="container-fluid py-4 backGround">
      <div className="w-50 mx-auto my-3 d-flex justify-content-center logo">
        <div>V</div>acation Calender
      </div>
      <div className="registartion mx-auto p-3">
        <h1 className=" d-flex justify-content-center">SignUp</h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className=" d-flex flex-wrap gap-2 justify-content-center"
        >
          <div className=" d-flex flex-column justify-content-center mx-4">
            <label className="  m-0">UserName:</label>

            <input
              className=" p-1 "
              type="text"
              value={loginCredential.userName}
              onChange={(e) =>
                setLoginCredential((data) => ({
                  ...data,
                  userName: e.target.value,
                }))
              }
            />
            {errors.userName && (
              <div className="text-danger">{errors.userName}</div>
            )}
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
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </div>

          <div className="col-12  my-2 d-flex justify-content-center gap-2 ">
            <input className="btn btn-success" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
