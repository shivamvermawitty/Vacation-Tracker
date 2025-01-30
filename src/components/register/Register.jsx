import { useState } from "react";
import "./Register.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputComponent from "../InputComponent/InputComponent";
import Dropdown from "../DropDown/Dropdown";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import { registerData } from "../../ApiMethods";


const formSchema = z.object({
  firstName: z.string().min(3, "First name is required"),
  lastName: z.string().min(3, "Last name is required"),
  password: z.string().min(4, "Invalid Password"),
  email: z.string().email("Invalid email address"),
  contact: z.string().min(10, "Invalid Contact Number"),
  dob: z.string().min(3, "Date Of Birth is required"),
  gender: z.string().min(4, "Gender is required"),
});

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    contact: "",
    dob: "",
    gender: "",
  });
  console.log(formData);
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    try {
      formSchema.parse(formData);
        registerData(formData)
        .then((register) => {
          navigate("/Login");
          console.log("User Registered", register);
        })
        .catch((err) => {
          console.log("Unable to register User");
        });

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
        <div className=" formDiv">
          <form onSubmit={(e) => handleSubmit(e)} className=" gap-2 ">
            <div className="d-flex flex-column  mx-4">
              <label className="  m-0">First Name:</label>
              <InputComponent
                type={"text"}
                formData={formData}
                name={"firstName"}
                setFormData={setFormData}
              />
              {errors.firstName && (
                <ErrorComponent errorMessage={errors.firstName}/>
                
              )}
            </div>
            <div className=" d-flex flex-column  mx-4">
              <label className=" m-0">Last Name:</label>
              <InputComponent
                type={"text"}
                formData={formData}
                name={"lastName"}
                setFormData={setFormData}
              />
              {errors.lastName && (
                <ErrorComponent errorMessage={errors.lastName}/>
               
              )}
            </div>
            <div className="d-flex flex-column  mx-4">
              <label className=" m-0">E-mail:</label>
              <InputComponent
                type={"text"}
                formData={formData}
                name={"email"}
                setFormData={setFormData}
              />
              
              
              {errors.email && (
                <ErrorComponent errorMessage={errors.email}/>
                
              )}
            </div>

            <div className=" d-flex flex-column mx-4">
              <label className=" m-0">Password:</label>
              <InputComponent
                type={"password"}
                formData={formData}
                name={"password"}
                setFormData={setFormData}
              />
              {errors.password && (
                <ErrorComponent errorMessage={errors.password}/>
                
              )}
            </div>

            <div className="d-flex flex-column mx-4">
              <label className="  m-0">Contact No.:</label>
              <InputComponent
                type={"text"}
                formData={formData}
                name={"contact"}
                setFormData={setFormData}
              />
              {errors.contact && (
                <ErrorComponent errorMessage={errors.contact}/>
                
              )}
            </div>
            <div className="d-flex flex-column mx-4">
              <label className="  m-0">D.O.B:</label>
              <InputComponent
                type={"date"}
                formData={formData}
                name={"dob"}
                setFormData={setFormData}
              />
              {errors.dateOfBirth && (
                <ErrorComponent errorMessage={errors.dob}/>
                
              )}
            </div>
            <div className="d-flex flex-column mx-4">
              <label className=" m-0">Gender:</label>
              <Dropdown formData={formData} setFormData={setFormData} name={"gender"} optionArr={['Male' , 'Female']}/>
              {errors.gender && (
                <ErrorComponent errorMessage={errors.gender}/>
         
              )}
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
