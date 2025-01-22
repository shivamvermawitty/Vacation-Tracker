import { useState } from "react";
import "./Profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  firstName: z.string().min(3, "First name is required"),
  lastName: z.string().min(3, "Last name is required"),
  userName: z.string().min(3, "Invalid Username"),
  password: z.string().min(4, "Invalid Password"),
  email: z.string().email("Please enter a valid email address"),
  contact: z.string().min(10, "Contact number should be at least 10 digits"),
  dateOfBirth: z.string().min(3, "Date Of Birth is required"),
  gender: z.string().min(4, "Gender is required"),
});

function Profile() {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [formData, setFormData] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    userName: userData?.userName,
    password: userData?.password,
    email: userData?.email,
    contact: userData?.contact,
    dateOfBirth: userData?.dateOfBirth,
    gender: userData?.gender,
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    try {
      formSchema.parse(formData);

      localStorage.setItem("userData", JSON.stringify(formData));
      console.log(formData);
      navigate("/home");
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
        <h1 className=" d-flex justify-content-center">User Details</h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className=" d-flex flex-wrap gap-2 justify-content-center"
        >
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
          <div className=" d-flex flex-column justify-content-center mx-4">
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
          <div className=" d-flex flex-column justify-content-center mx-4">
            <label className="  m-0">UserName:</label>

            <input
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
            <input className="btn btn-success" type="submit" value="Update" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
