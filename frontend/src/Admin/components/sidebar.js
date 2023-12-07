import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BsGrid1X2Fill,
  BsBuilding,
  BsPeopleFill,
  BsBarChartFill,
} from "react-icons/bs";

export const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  const location = useLocation();

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">Food Meter</div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className={`sidebar-list-item ${location.pathname === "/admin/" ? "active" : ""}`}>
          <Link to="/admin/">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className={`sidebar-list-item ${location.pathname === "/admin/user" ? "active" : ""}`}>
          <Link to="/admin/user">
            <BsPeopleFill className="icon" /> Users
          </Link>
        </li>
        <li className={`sidebar-list-item ${location.pathname === "/admin/restaurant" ? "active" : ""}`}>
          <Link to="/admin/restaurant">
            <BsBuilding className="icon" /> Restaurants
          </Link>
        </li>
        
      </ul>
    </aside>
  );
};
