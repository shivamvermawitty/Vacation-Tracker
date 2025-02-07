import "./Profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  useEffect,
  useState,
  useContext,
  z,
  useNavigate,
  InputComponent,
  Dropdown,
  ApiMethods,
  getData,
  updateData,
  UserContext,
} from "./index";

const formSchema = z.object({
  firstName: z.string().min(3, "First name is required"),
  lastName: z.string().min(3, "Last name is required"),
  userName: z.string().min(3, "Invalid Username"),
  password: z.string().min(4, "Invalid Password"),
  email: z.string().email("Please enter a valid email address"),
  contact: z.string().min(10, "Contact number should be at least 10 digits"),
  dob: z.string().min(3, "Date Of Birth is required"),
  gender: z.string().min(4, "Gender is required"),
  color: z.string().min(3, "Color is required"),
});

function Profile() {
  const { userDetails, setUserDetails , leaveDetails,setLeaveDetails} = useContext(UserContext);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    email: "",
    contact: "",
    dob: "",
    gender: "",
    color: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    setFormData((data) => ({
      ...data,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      password: userDetails.password,
      contact: userDetails.contact,
      dob: new Date(userDetails.dob).toISOString().split("T")[0],
      gender: userDetails.gender,
      color: userDetails.color,
    }));
  }, []);

  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData.dob)
    const [year, month, day] = formData.dob.split('-');
  const dateObj = new Date(year, month - 1, day);
  setUserDetails({...formData,dob:dateObj.toISOString()})

    try {
      updateData(formData)
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
            <InputComponent
              label={"First Name:"}
              type={"text"}
              formData={formData}
              name={"firstName"}
              setFormData={setFormData}
              errorMessage={errors.firstName}
            />
          </div>
          <div className=" d-flex flex-column justify-content-end mx-4">
            <InputComponent
              label={"Last Name:"}
              type={"text"}
              formData={formData}
              name={"lastName"}
              setFormData={setFormData}
              errorMessage={errors.lastName}
            />
          </div>
          <div className="d-flex flex-column justify-content-center mx-4">
            <InputComponent
              label={"E-mail"}
              type={"text"}
              formData={formData}
              name={"email"}
              setFormData={setFormData}
              errorMessage={errors.email}
            />
          </div>
          <div className=" d-flex flex-column justify-content-center mx-4">
            <InputComponent
              label={"Password:"}
              type={"password"}
              formData={formData}
              name={"password"}
              setFormData={setFormData}
              errorMessage={errors.password}
            />
          </div>

          <div className="d-flex flex-column justify-content-center mx-4">
            <InputComponent
              label={"Contact No:"}
              type={"text"}
              formData={formData}
              name={"contact"}
              setFormData={setFormData}
              errorMessage={errors.contact}
            />
          </div>
          <div className="d-flex flex-column justify-content-center mx-4">
            <InputComponent
              label={"D.O.B"}
              type={"date"}
              formData={formData}
              name={"dob"}
              setFormData={setFormData}
              errorMessage={errors.dob}
            />
          </div>
          <div className="d-flex flex-column justify-content-center mx-4">
            <InputComponent
              label={"Color:"}
              type={"color"}
              formData={formData}
              name={"color"}
              setFormData={setFormData}
              errorMessage={errors.color}
            />
          </div>
          <div className="d-flex flex-column justify-content-center mx-4 ">
            <Dropdown
              label={"Gender:"}
              formData={formData}
              setFormData={setFormData}
              name={"gender"}
              optionArr={["Male", "Female"]}
              errorMessage={errors.gender}
            />
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
