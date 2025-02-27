import { removePosition } from './findPos';
function isStart(year, month, index, fromDate) {
  // method to find if the date is the start day of leave
  return (
    new Date(year, month, index + 1).setHours(0, 0, 0, 0) ==
    new Date(fromDate).setHours(0, 0, 0, 0)
  );
}

function isEnd(year, month, index, toDate) {
  // method to find if the date is the end day of leave
  return (
    new Date(year, month, index + 1).setHours(0, 0, 0, 0) ==
    new Date(toDate).setHours(0, 0, 0, 0)
  );
}

function isNotLastDayOfLeave(year, month, index, fromDate, toDate) {
  // method to check the date is not the last day of leave
  return (
    new Date(year, month, index + 1).setHours(0, 0, 0, 0) >=
      new Date(fromDate).setHours(0, 0, 0, 0) &&
    new Date(year, month, index + 1).setHours(0, 0, 0, 0) <
      new Date(toDate).setHours(0, 0, 0, 0)
  );
}

function generateLeaveStrip(
  year,
  month,
  index,
  fromDate,
  toDate,
  pos,
  _id,
  email,
  color,
  ind,
  set
) {
  if (isNotLastDayOfLeave(year, month, index, fromDate, toDate)) {
    return (
      <div
        key={ind}
        className={`leaveStrip`}
        style={{
          backgroundColor: `${color}`,
          top: `${25 * (pos[_id] + 1.2) + 3 * pos[_id]}px`, // top is set based on the position of leave
          borderRadius:
            isStart(year, month, index, fromDate) &&
            isEnd(year, month, index, toDate)
              ? '10px'
              : isStart(year, month, index, fromDate)
                ? '10px 0 0 10px'
                : isEnd(year, month, index, toDate)
                  ? '0 10px 10px 0'
                  : '',
        }}
      >
        {isStart(year, month, index, fromDate) && (
          <p className=" text-white">{email}</p>
        )}
      </div>
    );
  } else if (isEnd(year, month, index, toDate)) {
    const el = (
      <div
        key={ind}
        className={`leaveStrip`}
        style={{
          backgroundColor: `${color}`,
          top: `${25 * (pos[_id] + 1.2) + 3 * pos[_id]}px`,
          borderRadius: isEnd(year, month, index, toDate)
            ? '0 10px 10px 0'
            : '',
        }}
      ></div>
    );
    removePosition(set, _id, pos);
    return el;
  }
}

export { generateLeaveStrip };
