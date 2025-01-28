import { useEffect, useState } from "react";
import "./Profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { z } from "zod";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import InputComponent from "../InputComponent/InputComponent";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import Dropdown from "../DropDown/Dropdown";

const formSchema = z.object({
  firstName: z.string().min(3, "First name is required"),
  lastName: z.string().min(3, "Last name is required"),
  userName: z.string().min(3, "Invalid Username"),
  password: z.string().min(4, "Invalid Password"),
  email: z.string().email("Please enter a valid email address"),
  contact: z.string().min(10, "Contact number should be at least 10 digits"),
  dob: z.string().min(3, "Date Of Birth is required"),
  gender: z.string().min(4, "Gender is required"),
});

function Profile() {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("authToken");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    email: "",
    contact: "",
    dob: "",
    gender: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData(userEmail, token) {
      try {
        const response = await axios.get(
          `http://localhost:3000/details/${userEmail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setFormData((data) => ({
          ...data,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          password: response.data.password,
          contact: response.data.contact,
          dob: new Date(response.data.dob).toISOString().split("T")[0],
          gender: response.data.gender,
        }));
      } catch (err) {
        console.log("Error fetching Data");
      }
    }
    fetchData(email, token);
  }, []);

  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(formData)

    try {
      console.log(formData);

      console.log(formData, "afterParse");

      axios
        .patch("http://localhost:3000/update", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((update) => {
          navigate("/home");
          setErrors({});
          console.log("Profile Updated", update);
        })
        .catch((err) => {
          console.log("Unable to register User");
        });
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
      <div className="registartion mx-auto p-3 ">
        <h1 className=" d-flex justify-content-center">User Details</h1>

        <form onSubmit={(e) => handleSubmit(e)} className=" d-flex">
          <div className="d-flex flex-column justify-content-center mx-4">
            <label className="  m-0">First Name:</label>
            <InputComponent
              type={"text"}
              formData={formData}
              name={"firstName"}
              setFormData={setFormData}
            />
            {errors.firstName && (
              <ErrorComponent errorMessage={errors.firstName} />
            )}
          </div>
          <div className=" d-flex flex-column justify-content-end mx-4">
            <label className=" m-0">Last Name:</label>

            <InputComponent
              type={"text"}
              formData={formData}
              name={"lastName"}
              setFormData={setFormData}
            />
            {errors.lastName && (
              <ErrorComponent errorMessage={errors.lastName} />
            )}
          </div>
          <div className="d-flex flex-column justify-content-center mx-4">
            <label className=" m-0">E-mail:</label>

            <InputComponent
              type={"text"}
              formData={formData}
              name={"email"}
              setFormData={setFormData}
            />

            {errors.email && <ErrorComponent errorMessage={errors.email} />}
          </div>
          <div className=" d-flex flex-column justify-content-center mx-4">
            <label className=" m-0">Password:</label>

            <InputComponent
              type={"password"}
              formData={formData}
              name={"password"}
              setFormData={setFormData}
            />
            {errors.password && (
              <ErrorComponent errorMessage={errors.password} />
            )}
          </div>

          <div className="d-flex flex-column justify-content-center mx-4">
            <label className="  m-0">Contact No.:</label>

            <InputComponent
              type={"text"}
              formData={formData}
              name={"contact"}
              setFormData={setFormData}
            />
            {errors.contact && <ErrorComponent errorMessage={errors.contact} />}
          </div>
          <div className="d-flex flex-column justify-content-center mx-4">
            <label className="  m-0">D.O.B:</label>

            <InputComponent
              type={"date"}
              formData={formData}
              name={"dob"}
              setFormData={setFormData}
            />
            {errors.dateOfBirth && <ErrorComponent errorMessage={errors.dob} />}
          </div>
          <div className="d-flex flex-column justify-content-center mx-4 ">
            <label className=" m-0">Gender:</label>

            <Dropdown formData={formData} setFormData={setFormData} name={"gender"} optionArr={['Male' , 'Female']}/>
                          {errors.gender && (
                            <ErrorComponent errorMessage={errors.gender}/>
                     
                          )}
          </div>
          <div>
            <input type="submit" className=" fw-bold my-3" value="Update" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
