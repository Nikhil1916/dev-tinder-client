import { useDispatch, useSelector } from "react-redux";
import { User } from "../utils/interfaces";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { toastHelper } from "../utils/toast";
import { toastEnum } from "../utils/enums";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user: User | null = useSelector((store: any) => store.user);
  const handleLogout = async() => {
    try {
      await axios.post(BASE_URL + "/auth/logout", {}, { withCredentials: true });
      dispatch(removeUser(null));
      navigate("/login");
      toastHelper("User logout successful", toastEnum.SUCCESS);
    } catch (err:any) {
      toastHelper(err?.message,toastEnum.ERROR);
    }
  }
  if(!user) {
    return null;
  }
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            👩‍💻 DevTinder
          </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end mr-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="user_logo"
                src={
                  user?.photoUrl ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/profile"} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
            <Link to="/connections">Connections</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
