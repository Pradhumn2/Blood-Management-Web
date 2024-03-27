import React from "react";
import { BiDonateBlood } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
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
            <li className="nav-item mx=3">
              <p>
                Welcome{" "}
                {user?.name || user?.hospitalName || user?.organisationName}{" "}
                &nbsp;
                <span className="badge bg-secondary">{user?.role}</span>
              </p>
            </li>
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
