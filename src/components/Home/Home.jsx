import {useEffect,useState , DateCard} from './index'
import "./Home.css";

function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();
  const monthYear = `${firstDay.toLocaleString("default", {
    month: "long",
  })} ${year}`;
  function changeMonth(counter) {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + counter);
    setCurrentDate(newDate);
  }
  function selectDate(date, month, year) {
    
    let getDate = new Date(Date.UTC(year, month, date));
    getDate = getDate.toISOString().split("T")[0];

    if (startDate === null) {
      setStartDate(getDate);
    } else if (endDate === null) {
      setEndDate(getDate);
    }
  }
  function handleReset(){
    setEndDate(null);
    setStartDate(null)
  }
  


  return (
    <>
      <div className="row justify-content-between calenderHeader">
        <h1 className="col-3 fw-bold">{monthYear}</h1>
        <div className="col-6 d-flex align-items-center justify-content-end gap-2">
          
          <button className=" btn btn-outline-primary bg-white text-primary fw-bold" onClick={handleReset}>
            Reset
          </button>
        </div>
        <div className="col-3 d-flex justify-content-center align-items-center fs-1 ">
          <i
            className="fa-solid fa-chevron-left p-1 bg-white rounded m-1"
            onClick={() => changeMonth(-1)}
          ></i>
          <i
            className="fa-solid fa-chevron-right p-1 bg-white rounded"
            onClick={() => changeMonth(1)}
          ></i>
        </div>
      </div>
      <div className="weekDays">
        <div className="dayBox text-danger fw-bold d-flex justify-content-center">
          Sunday
        </div>
        <div className="dayBox  fw-bold d-flex justify-content-center">
          Monday
        </div>
        <div className="dayBox fw-bold d-flex justify-content-center">
          Tuesday
        </div>
        <div className="dayBox fw-bold d-flex justify-content-center">
          Wedneday
        </div>
        <div className="dayBox fw-bold d-flex justify-content-center">
          Thursday
        </div>
        <div className="dayBox fw-bold d-flex justify-content-center">
          Friday
        </div>
        <div className="dayBox fw-bold d-flex justify-content-center">
          Saturday
        </div>
      </div>
      <div className="dateBox row">
        {new Array(startingDay).fill().map((v, index) => (
          <div key={index} className="dateCard">
            <DateCard />
          </div>
        ))}
        {new Array(daysInMonth).fill().map((_, index) => (
          <div
            className={` ${new Date(year,month,index+1).getDay()==0?'disabledDate':'dateCard'} ${new Date(year,month,index+1).getDay()==6?'disabledDate':'dateCard'} ${
              currentDate.getDate() == index + 1 &&
              currentDate.getMonth() == new Date().getMonth() &&
              currentDate.getFullYear() == new Date().getFullYear()
                ? "currentDate"
                : ""
            } ${
              (startDate ===
              new Date(Date.UTC(year, month, index + 1))
                .toISOString()
                .split("T")[0]
                ? "startDate"
                : "")
            } ${
              endDate ===
              new Date(Date.UTC(year, month, index + 1))
                .toISOString()
                .split("T")[0]
                ? "endDate"
                : ""}`}
            key={index}
            onClick={() => selectDate(index + 1, month, year)}
          >
            <li hidden={!(new Date(year,month,index+1)>=new Date(startDate) && new Date(year,month,index+1)<=new Date(endDate))} ></li>
            <div><DateCard date={index + 1} month={month} year={year} showLi={!(new Date(year,month,index+1)>=new Date(startDate) && new Date(year,month,index+1)<=new Date(endDate))}/></div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
