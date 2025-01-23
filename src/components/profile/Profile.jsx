import { useEffect, useState } from "react";
import "./Profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { z } from "zod";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";

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
        console.log(response.data)
        setFormData((data) => ({
          ...data,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          password: response.data.password,
          contact: response.data.contact,
          dob: new Date(response.data.dob).toISOString().split('T')[0],
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

    try {
      formSchema.parse(formData);
      axios
        .patch("http://localhost:3000/update", formData)
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
            <input
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
          <div className=" d-flex flex-column justify-content-end mx-4">
            <label className=" m-0">Last Name:</label>

            <input
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
          <div className="d-flex flex-column justify-content-center mx-4">
            <label className=" m-0">E-mail:</label>

            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((data) => ({
                  ...data,
                  email: e.target.value,
                }))
              }
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className=" d-flex flex-column justify-content-center mx-4">
            <label className=" m-0">Password:</label>

            <input
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
            <label className="  m-0">Contact No.:</label>

            <input
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
              value={formData.dob}
              onChange={(e) =>
                setFormData((data) => ({
                  ...data,
                  dob: e.target.value,
                }))
              }
            />
            {errors.dateOfBirth && (
              <div className="text-danger">{errors.dateOfBirth}</div>
            )}
          </div>
          <div className="d-flex flex-column justify-content-center mx-4 ">
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
          <div>
            <input type="submit" className=" fw-bold my-3" value="Update" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
