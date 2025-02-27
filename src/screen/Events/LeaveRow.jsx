import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function LeaveRow({ eventName, eventDate, _id, handleDelete }) {
  return (
    <tr className="row">
      <td className="col-5 d-flex justify-content-center align-items-center">
        {eventName}
      </td>
      <td className=" col-3 d-flex justify-content-center align-items-center">
        {new Date(eventDate).toLocaleDateString('en-GB')}
      </td>
      <td className=" col-4 d-flex flex-wrap gap-1 justify-content-center align-items-center">
        <Link to={`/event/updateEvent/${_id}`}>Update</Link>
        <button onClick={() => handleDelete(_id)} className="deleteButton">
          Delete
        </button>
      </td>
    </tr>
  );
}
LeaveRow.propTypes = {
  eventName: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
