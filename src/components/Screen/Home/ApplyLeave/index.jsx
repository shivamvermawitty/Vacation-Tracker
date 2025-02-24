import { useState } from 'react';
import { useUser } from '../../../../useUser';
import LeaveDateInput from './LeaveDateInput';
import { postLeaveDetails } from '../../../../ApiMethods';
import PropTypes from 'prop-types';
import './ApplyLeave.css';
import FormHeading from '../../../FormHeading';
import { parseFormData } from './parcer';

export default function ApplyLeave({
  modalRef,
  setLeaveDetails,
  setShowLeaveModal,
  year,
  month,
}) {
  const [errors, setErrors] = useState({});
  const { userDetails } = useUser();
  // const { currentDate, setLeaveDetails, setShowLeaveModal } = useHome();
  // const year = currentDate.getFullYear();
  // const month = currentDate.getMonth();
  const [leaveDetail, setLeaveDetail] = useState({
    fromDate: new Date(year, month, 2).toISOString().split('T')[0],
    toDate: new Date(year, month, 2).toISOString().split('T')[0],
    color: userDetails.color,
    email: userDetails.email,
  });

  async function handleLeaveSubmit(e) {
    e.preventDefault();

    if (!parseFormData(leaveDetail)) {
      try {
        setLeaveDetails((data) => [...data, leaveDetail]);

        await postLeaveDetails(leaveDetail);

        setErrors({});
        setShowLeaveModal(false);
      } catch (err) {
        console.log('Unable to post leave Details', err);
      }
    }
  }

  return (
    <div className=" leaveModal">
      <div className="leave " ref={modalRef}>
        <FormHeading heading={'Apply Leave'} />

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
    </div>
  );
}
ApplyLeave.propTypes = {
  modalRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  setLeaveDetails: PropTypes.func.isRequired,
  setShowLeaveModal: PropTypes.func,
};
