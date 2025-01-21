import { useState } from "react";
import './Register.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(3, "First name is required"),
  lastName: z.string().min(3, "Last name is required"),
  userName:z.string().min(3,"Invalid Username"),
  password:z.string().min(4,"Invalid Password"),
  email: z.string().email("Please enter a valid email address"),
  contact: z.string().min(10, "Contact number should be at least 10 digits"),
  dateOfBirth: z.string().min(3, "Date Of Birth is required"),
  gender: z.string().min(4, "Gender is required"),
});

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName:'',
    password:'',
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
    <div className=" d-grid container-fluid py-4">
      <div className="row">
        <div className="col-2 col-lg-3"></div>
        <div className="col-8 col-lg-6 d-grid justify-content-center border border-1 border-black rounded-1 ">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <h1 className=" heading">Register/SignUp</h1>
            </div>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
              <div className="col-12 col-md-6 my-2 d-grid justify-content-center">
                <label className=" fs-3 m-0">First Name:</label>
                <br />
                <input
                  className="rounded-1 p-1"
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
              <div className="col-12 col-md-6 my-2 d-grid justify-content-center">
                <label className=" fs-3 m-0">Last Name:</label>
                <br />
                <input
                  className="rounded-1 p-1"
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
              <div className="col-12 col-md-6 my-2 d-grid justify-content-center">
                <label className=" fs-3 m-0">UserName:</label>
                <br />
                <input
                  className="rounded-1 p-1"
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
              <div className="col-12 col-md-6 my-2 d-grid justify-content-center">
                <label className=" fs-3 m-0">password:</label>
                <br />
                <input
                  className="rounded-1 p-1"
                  type="text"
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
              <div className="col-12 col-md-6 my-2 d-grid justify-content-center">
                <label className=" fs-3 m-0">E-mail:</label>
                <br />
                <input
                  className="rounded-1 p-1"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((data) => ({ ...data, email: e.target.value }))
                  }
                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>
              <div className="col-12 col-md-6 my-2 d-grid justify-content-center">
                <label className=" fs-3 m-0">Contact No.:</label>
                <br />
                <input
                  className="rounded-1 p-1"
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
              <div className="col-12 col-md-6 my-2 d-grid justify-content-center">
                <label className=" fs-3 m-0">D.O.B:</label>
                <br />
                <input
                  className="rounded-1 p-1"
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
              <div className="col-12 col-md-6 my-2 d-grid justify-content-center">
                <label className=" fs-3 m-0">Gender:</label>
                <br />
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData((data) => ({ ...data, gender: e.target.value }))
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

export default Register;
