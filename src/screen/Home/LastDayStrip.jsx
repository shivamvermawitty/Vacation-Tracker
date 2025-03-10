import PropTypes from 'prop-types';

export default function LastDayStrip({
  ind,
  pos,
  _id,
  index,
  removePosition,
  set,
  getStyle,
}) {
  const el = (
    <div key={ind} className={`leaveStrip`} style={getStyle(index)}></div>
  );
  removePosition(set, _id, pos);
  return el;
}
LastDayStrip.propTypes = {
  ind: PropTypes.number.isRequired,
  pos: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  removePosition: PropTypes.func.isRequired,
  set: PropTypes.instanceOf(Set).isRequired,
  getStyle: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
};
