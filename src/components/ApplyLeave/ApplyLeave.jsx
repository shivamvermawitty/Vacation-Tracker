import {useState ,InputComponent} from './index'
import { z } from "zod";
import "./ApplyLeave.css";
import { useEffect , useContext } from 'react';
import { UserContext } from "../../App";
import LeaveDateInput from '../LeaveDateInput/LeaveDateInput';
import { postLeaveDetails } from '../../ApiMethods';

const formSchema = z.object({
  fromDate: z
    .string()
    .min(3, "Date Of Birth is required"),
  toDate: z
    .string()
    .min(3, "Date Of Birth is required"),
  color: z.string().min(3, "Color is required"),
  email:z.string().email('Invalid Email')
});

export default function ApplyLeave({ modalRef ,setShowLeaveModal , setUserLeaveDetails ,month ,year }) {
  const [errors, setErrors] = useState({});

  const [leaveDetail, setLeaveDetail] = useState({
    fromDate: new Date(year,month ,2).toISOString().split('T')[0],
    toDate: new Date(year,month ,2).toISOString().split('T')[0],
    color: "",
    email:''
  });

  const {userDetails,setUserDetails, leaveDetails , setLeaveDetails} = useContext(UserContext);
  useEffect(()=>{
    setLeaveDetail(otherDetails=>({...otherDetails,color:userDetails.color ,email:userDetails.email}))
    // console.log(userDetails)

  },[])
 async  function handleLeaveSubmit(e) {
    e.preventDefault();
    try {
      formSchema.parse(leaveDetail);
      console.log(leaveDetail)
      setLeaveDetails(details=>([...details,leaveDetail]))
      const response =await postLeaveDetails(leaveDetail)
      setErrors({});
      setShowLeaveModal(false)
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
    <div className="leave " ref={modalRef}>
      <h2 className=" d-flex justify-content-center">Apply Leave</h2>

      <form
        className=" d-flex flex-column justify-content-center"
        onSubmit={(e) => handleLeaveSubmit(e)}
      >
        <div className=" d-flex justify-content-between align-items-center gap-1">
          <LeaveDateInput
          label={'From Date:'}
          formData={leaveDetail}
          name={'fromDate'}
          setFormData={setLeaveDetail}
          errorMessage={errors.fromDate}
          month={month}
          year={year}
          
          />
          
        </div>

        <div className=" d-flex justify-content-between align-items-center gap-1">
        <LeaveDateInput
          label={'To Date:'}
          formData={leaveDetail}
          name={'toDate'}
          setFormData={setLeaveDetail}
          errorMessage={errors.toDate}
          month={month}
          year={year}
          
          />
        </div>
        <br />
        <div>
          <button type="submit" className="submitButton">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
