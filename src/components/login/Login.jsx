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
    <div className=" d-grid container-fluid py-4">
      <div className="row">
        <div className="col-2 col-lg-3"></div>
        <div className="col-8 col-lg-6 d-grid justify-content-center border border-1 border-black rounded-1 ">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <h1 className=" heading">Login</h1>
            </div>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
              <div className="col-12 col-md-6 my-2 d-grid justify-content-center">
                <label className=" fs-3 m-0">UserName:</label>
                <br />
                <input
                  className="rounded-1 p-1"
                  type="text"
                  value={loginCredential.userName}
                  onChange={(e) =>
                    setLoginCredential((data) => ({
                      ...data,
                      userName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-12 col-md-6 my-2 d-grid justify-content-center">
                <label className=" fs-3 m-0">password:</label>
                <br />
                <input
                  className="rounded-1 p-1"
                  type="text"
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
                <div className="col-12 col-md-12 my-2 d-grid justify-content-center text-danger">
                  Invalid Email Or Password
                </div>
              )}

              <div className="col-12 col-md-12 my-2 d-grid justify-content-center">
                <input
                  className="rounded-1 p-1 btn btn-primary"
                  type="submit"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="col-2 col-lg-3"></div>
      </div>
    </div>
  );
}

export default Login;
