import {UserContext , getData , useContext , useState , useRef , useEffect , Link ,useNavigate} from './index'
import "./Navbar.css";


export default function Navbar() {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [userName, setUserName] = useState();
  const [showLogOut, setShowLogOut] = useState(false);
  const navigate = useNavigate();
  // console.log(user)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getData();
        setUserName(response.firstName);
        setUserDetails(response);
      } catch (err) {
        console.log("Error fetching Data");
      }
    }
    fetchData();
  }, []);

  function handleClick() {
    setShowLogOut((d) => !d);
  }
  function handleLogOut() {
    localStorage.clear();

    navigate("/Login");
  }
  return (
    <>
    <div className="row navBar">
      <ul className=" col-6 d-flex gap-3">
        <li className="p-2 list-unstyled">
          <Link className=" fs text-white text-decoration-none" to="/home">
            Home
          </Link>
        </li>
        <li className="p-2 list-unstyled">
          <Link className=" fs text-white text-decoration-none" to="/profile">
            Profile
          </Link>
        </li>
      </ul>
      <div className="col-6 d-flex flex-column justify-content-end">
        {/* <div className="d-grid"> */}
        {/* <div className="row"> */}

        {/* <div className="row">
                {showLogOut && (
                  <button className="col-6 bg-white btn" onClick={handleLogOut}>
                    LogOut
                  </button>
                )}
              </div> */}
        {/* </div> */}
        {/* </div> */}
        <p className=" btn fs d-flex justify-content-end text-white" onClick={handleClick}>
          Welcome {userName}
        </p>
        
      </div>
    </div>
    <div className="d-flex justify-content-end mx-4">
          {showLogOut && (
            <button className="bg-white logOutBtn" onClick={handleLogOut}>
              LogOut
            </button>
          )}
        </div>
    </>
    
  );
}
