import { useState } from "react";
import "./Register.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z.object({
  firstName: z.string().min(3, "First name is required"),
  lastName: z.string().min(3, "Last name is required"),
  userName: z.string().min(3, "Invalid Username"),
  password: z.string().min(4, "Invalid Password"),
  email: z.string().email("Invalid email address"),
  contact: z.string().min(10, "Invalid Contact Number"),
  dateOfBirth: z.string().min(3, "Date Of Birth is required"),
  gender: z.string().min(4, "Gender is required"),
});

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    email: "",
    contact: "",
    dateOfBirth: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    try {
      formSchema.parse(formData);

      localStorage.setItem("userData", JSON.stringify(formData));
      navigate("/Login");
      console.log(formData);
      setErrors({});
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
        <form onSubmit={(e) => handleSubmit(e)} className=" d-flex flex-wrap gap-2 justify-content-center">
              
                <div className="d-flex flex-column justify-content-center mx-4">
                  <label className="  m-0">First Name:</label>
                  <input
                    className=" p-1"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((data) => ({
                        ...data,
                        firstName: e.target.value,
                      }))
                    }
                  />
                  {errors.firstName && (
                    <div className="text-danger">{errors.firstName}</div>
                  )}
                </div>
                <div className=" d-flex flex-column justify-content-center mx-4">
                  <label className=" m-0">Last Name:</label>
                  
                  <input
                    className=" p-1"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData((data) => ({
                        ...data,
                        lastName: e.target.value,
                      }))
                    }
                  />
                  {errors.lastName && (
                    <div className="text-danger">{errors.lastName}</div>
                  )}
                </div>
                <div className=" d-flex flex-column justify-content-center mx-4">
                  <label className="  m-0">UserName:</label>
                  
                  <input
                    className=" p-1 "
                    type="text"
                    value={formData.userName}
                    onChange={(e) =>
                      setFormData((data) => ({
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
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((data) => ({
                        ...data,
                        password: e.target.value,
                      }))
                    }
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>
                <div className="d-flex flex-column justify-content-center mx-4">
                  <label className=" m-0">E-mail:</label>
                  
                  <input
                    className=" p-1 "
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((data) => ({
                        ...data,
                        email: e.target.value,
                      }))
                    }
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
                <div className="d-flex flex-column justify-content-center mx-4">
                  <label className="  m-0">Contact No.:</label>
                  
                  <input
                    className=" p-1 "
                    type="text"
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData((data) => ({
                        ...data,
                        contact: e.target.value,
                      }))
                    }
                  />
                  {errors.contact && (
                    <div className="text-danger">{errors.contact}</div>
                  )}
                </div>
                <div className="d-flex flex-column justify-content-center mx-4">
                  <label className="  m-0">D.O.B:</label>
                  
                  <input
                  className=""
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData((data) => ({
                      ...data,
                      dateOfBirth: e.target.value,
                    }))
                  }
                />
                  {errors.dateOfBirth && (
                    <div className="text-danger">{errors.dateOfBirth}</div>
                  )}
                </div>
                <div className="d-flex flex-column justify-content-center mx-4">
                  <label className=" m-0">Gender:</label>
                  
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData((data) => ({
                        ...data,
                        gender: e.target.value,
                      }))
                    }
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && (
                    <div className="text-danger">{errors.gender}</div>
                  )}
                </div>
                <div className="col-12  my-2 d-flex justify-content-center gap-2 ">
                  <input
                    className="btn btn-success"
                    type="submit"
                    value="Register"
                  />
                  <Link to="/Login" className="btn loginButton">
                    LogIn
                  </Link>
                </div>
              
            </form>

          {/* <div className=" w-100 d-flex justify-content-center registationForm ">
          
            
          </div> */}
          
        
      </div>
    </div>
  );
}

export default Register;
