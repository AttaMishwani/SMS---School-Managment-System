import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/Auth";

export default function Navbar() {
  const navigate = useNavigate();
const {isLoggedIn , logoutUser} = useAuth();


const handleLogout = () => {
  logoutUser();
  navigate("/");  // Force redirect after logout
};

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <header className="border-b bg-white w-full">
      <div className="w-full max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-slate-900">
          SMS
        </Link>

        <nav className="flex items-center gap-2">
          {isLoggedIn ?   <button
    onClick={handleLogout}
    className="px-3 py-2 rounded-lg text-sm font-medium transition text-slate-700 hover:bg-slate-100"
  >
    Logout
  </button> : (<><NavLink to="/login" className={linkClass}>
            Login
          </NavLink>
          <NavLink to="/signup" className={linkClass}>
            Sign Up
          </NavLink></>)}
          
        </nav>
      </div>
    </header>
  );
}