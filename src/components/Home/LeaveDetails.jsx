import PropTypes from 'prop-types';
import { useUser } from '../../useUser';

export default function LeaveDetails({ index, leaveDetails, year, month }) {
  let { c } = useUser();
  let flag = 0;
  let temp = 0;
  return (
    <>
      {Array.isArray(leaveDetails)
        ? leaveDetails.map((leaveDetail, ind) => {
            if (index == 0) {
              console.log(c.current, 'monthStart');
            }

            if (
              new Date(year, month, index + 1).setHours(0, 0, 0, 0) ==
              new Date(leaveDetail.fromDate).setHours(0, 0, 0, 0)
            ) {
              temp++;
              console.log(
                temp,
                new Date(year, month, index + 1).toDateString()
              );
              const lineBreak = Array.from({ length: c.current }, (_, i) => (
                <br key={i} />
              ));
              const width = Math.min(
                6 - new Date(year, month, index).getDay(),
                Math.min(
                  new Date(year, month + 1, 0).getDate() - index,
                  Math.floor(
                    (new Date(leaveDetail.toDate) -
                      new Date(year, month, index)) /
                      (1000 * 3600 * 24)
                  )
                )
              );

              return (
                <>
                  {lineBreak}
                  <div
                    key={ind}
                    className={`leaveStrip`}
                    style={{
                      backgroundColor: `${leaveDetail['color']}`,
                      width: `${100 * width}%`,
                    }}
                  >
                    <p className=" text-white">
                      {leaveDetail.email}
                      {c.current}
                    </p>
                  </div>
                </>
              );
            } else if (
              new Date(year, month, index + 1).getDay() == 0 &&
              new Date(leaveDetail.toDate).setHours(0, 0, 0, 0) >=
                new Date(year, month, index + 1).setHours(0, 0, 0, 0) &&
              new Date(leaveDetail.fromDate).setHours(0, 0, 0, 0) <
                new Date(year, month, index + 1).setHours(0, 0, 0, 0)
            ) {
              // c.current=0
              if (flag == 0) {
                c.current = 0;
                flag = 1;
              }
              const width =
                Math.floor(
                  (new Date(leaveDetail.toDate) -
                    new Date(year, month, index)) /
                    (1000 * 3600 * 24)
                ) > 7
                  ? 7
                  : Math.floor(
                      (new Date(leaveDetail.toDate) -
                        new Date(year, month, index)) /
                        (1000 * 3600 * 24)
                    );
              const lineBreak = Array.from({ length: c.current }, (_, i) => (
                <br key={i} />
              ));
              c.current++;
              return (
                <>
                  {lineBreak}
                  <div
                    key={ind}
                    className={`leaveStrip midLeave ${new Date(year, month, index + 1).setHours(0, 0, 0, 0) == new Date(leaveDetail.fromDate).setHours(0, 0, 0, 0) ? 'borderRadiusLeft' : ''} ${new Date(year, month, index + 1).setHours(0, 0, 0, 0) == new Date(leaveDetail.toDate).setHours(0, 0, 0, 0) ? 'borderRadiusRight' : ''}`}
                    style={{
                      backgroundColor: `${leaveDetail['color']}`,
                      width: `${100 * width}%`,
                    }}
                  >
                    <p className=" text-white">
                      {leaveDetail.email} {c.current}
                    </p>
                  </div>
                </>
              );
            } else if (
              new Date(leaveDetail.toDate) >=
                new Date(year, month, index + 1) &&
              new Date(leaveDetail.fromDate) < new Date(year, month, index + 1)
            ) {
              if (index == 0) {
                if (flag == 0) {
                  c.current = 0;
                  flag = 1;
                }
                const width =
                  Math.floor(
                    (new Date(leaveDetail.toDate) -
                      new Date(year, month, index)) /
                      (1000 * 3600 * 24)
                  ) > 7
                    ? 7
                    : Math.floor(
                        (new Date(leaveDetail.toDate) -
                          new Date(year, month, index)) /
                          (1000 * 3600 * 24)
                      );
                const lineBreak = Array.from({ length: c.current }, (_, i) => (
                  <br key={i} />
                ));
                c.current++;
                return (
                  <>
                    {lineBreak}
                    <div
                      key={ind}
                      className={`leaveStrip `}
                      style={{
                        backgroundColor: `${leaveDetail['color']}`,
                        width: `${100 * width}%`,
                      }}
                    >
                      <p className=" text-white">
                        {leaveDetail.email} {c.current}
                      </p>
                    </div>
                  </>
                );
              }
            }
            if (
              new Date(year, month, index + 1).setHours(0, 0, 0, 0) ==
              new Date(leaveDetail.toDate).setHours(0, 0, 0, 0)
            ) {
              c.current--;
            }
            if (ind == leaveDetails.length - 1) {
              console.log(temp);
              c.current += temp;
              console.log(c.current, 'another');
            }
          })
        : ''}
    </>
  );
}
LeaveDetails.propTypes = {
  index: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  leaveDetails: PropTypes.array,
};
