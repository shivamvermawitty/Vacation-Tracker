import DayName from './DayName';

export default function Week() {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]; // weekdays array
  return (
    <div className="weekDays">
      {days.map((el, ind) => (
        <DayName dayName={el} key={ind} />
      ))}
    </div>
  );
}
