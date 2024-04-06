import React from "react";
// import { userMenu } from "./Menus/userMenu";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../styles/Layout.css";
const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {user?.role === "organisation" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/" && "active"
                } `}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/">Inventory</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/donar" && "active"
                } `}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/donar">Donar</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital" && "active"
                } `}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/hospital">Hospital</Link>
              </div>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/donar-list" && "active"
                } `}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/donar-list">Donar List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital-list" && "active"
                } `}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/hospital-list">Hospital List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/organisation-list" && "active"
                } `}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/organisation-list">Organisation List</Link>
              </div>
            </>
          )}
          {(user?.role === "donar" || user?.role === "hospital") && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/organisation" && "active"
                } `}
              >
                <i className="fa-sharp fa-solid fa-building-ngo"></i>
                <Link to="/organisation">Organisation</Link>
              </div>
            </>
          )}
          {user?.role === "hospital" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/consumer" && "active"
                } `}
              >
                <i className="fa-sharp fa-solid fa-building-ngo"></i>
                <Link to="/consumer">Consumer</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
