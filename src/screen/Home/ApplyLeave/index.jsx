import { useState } from 'react';
import { useUser } from '../../../useUser';
import LeaveDateInput from './LeaveDateInput';
import { postLeaveDetails } from '../../../ApiMethods';
import PropTypes from 'prop-types';
import './ApplyLeave.css';
import FormHeading from '../../../components/FormHeading';
import { validateLeaveForm } from './validation';

export default function ApplyLeave({
  modalRef,
  setLeaveDetails,
  setShowLeaveModal,
  year,
  month,
}) {
  const [errors, setErrors] = useState(null);
  const { userDetails } = useUser();
  const [leaveDetail, setLeaveDetail] = useState({
    fromDate: new Date(year, month, 2).toISOString().split('T')[0],
    toDate: new Date(year, month, 2).toISOString().split('T')[0],
    color: userDetails.color,
    email: userDetails.email,
  });

  function handleChange(e, propertyName) {
    // Leave Input change handler
    setLeaveDetail((data) => ({ ...data, [propertyName]: e.target.value }));
  }

  async function handleLeaveSubmit(e) {
    // Leave Submit handler
    e.preventDefault();
    const result = validateLeaveForm(leaveDetail);
    if (!result.valid) {
      // setting errors when the parsing fails
      setErrors(result.error);
      return;
    }

    try {
      setLeaveDetails((data) => [...data, leaveDetail]);
      await postLeaveDetails(leaveDetail);
      setErrors(null);
      setShowLeaveModal(false);
    } catch (err) {
      console.log('Unable to post leave Details', err);
    }
  }

  return (
    <div className=" leaveModal">
      <div className="leave " ref={modalRef}>
        <FormHeading heading="Apply Leave" />

        <form
          className=" d-flex flex-column justify-content-center"
          onSubmit={(e) => handleLeaveSubmit(e)}
        >
          <div className=" d-flex justify-content-between align-items-center gap-1">
            <LeaveDateInput
              label="From Date:"
              value={leaveDetail['fromDate']}
              handleChange={(e) => handleChange(e, 'fromDate')}
              errorMessage={errors?.fromDate}
            />
          </div>

          <div className=" d-flex justify-content-between align-items-center gap-1">
            <LeaveDateInput
              label="To Date:"
              value={leaveDetail['toDate']}
              handleChange={(e) => handleChange(e, 'toDate')}
              errorMessage={errors?.toDate}
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
