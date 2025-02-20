import PropTypes from 'prop-types';
export default function EventDetails({ index, eventDetails, year, month }) {
  return (
    <>
      {Array.isArray(eventDetails)
        ? eventDetails.map((event, i) => {
            if (
              new Date(year, month, index + 1).setHours(0, 0, 0, 0) ==
              new Date(event.eventDate).setHours(0, 0, 0, 0)
            )
              return (
                <div
                  className=" d-flex justify-content-center eventDate"
                  key={i}
                >
                  {event.eventName}
                </div>
              );
          })
        : null}
    </>
  );
}
EventDetails.propTypes = {
  index: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  eventDetails: PropTypes.array,
};
