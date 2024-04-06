import React from "react";
import { BiDonateBlood } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const hnadleLogout = () => {
    localStorage.clear();
    alert("Logout Successfully !!");
    navigate("/login");
  };

  return (
    <div>
      <div className="navbar">
        <div className="container-fluid">
          <div className="navbar">
            <BiDonateBlood color="red" /> <h5>Blood Bank App</h5>
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link">
                Welcome{" "}
                {user?.name || user?.hospitalName || user?.organisationName}{" "}
                &nbsp;
                <span className="badge bg-secondary">{user?.role}</span>
              </p>
            </li>
            {(location.pathname !== "/analytics" && user?.role !== "admin") ? (
              <li className="nav-item mx-3">
                <Link to="/analytics" className="nav-link">
                  Analytics
                </Link>
              </li>
            ) : (
              <li className="nav-item mx-3">
                {(user?.role === "donar" || user?.role === "hospital") && (
                  <Link to="/organisation" className="nav-link">
                    Home
                  </Link>
                )}
                {user?.role === "admin" && (
                  <Link to="/admin" className="nav-link">
                    Home
                  </Link>
                )}
                {user?.role === "organisation" && (
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                )}
              </li>
            )}
            <li className="nav-item mx-3">
              <button className="btn btn-danger" onClick={hnadleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
