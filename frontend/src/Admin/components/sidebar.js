import React from "react";
import {
  BsGrid1X2Fill,
  BsBuilding,
  BsPeopleFill,
  BsBarChartFill,
  
  
  
} from "react-icons/bs";

import { useLocation } from "react-router-dom";

export const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  const location = useLocation();
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">Food Meter</div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li
          className={`sidebar-list-item ${
            location.pathname === "/dashboard" ? "active" : ""
          }`}
        >
          <a href="/dashboard">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <li
          className={`sidebar-list-item ${
            location.pathname === "/users" ? "active" : ""
          }`}
        >
          <a href="/users">
            <BsPeopleFill className="icon" /> Users
          </a>
        </li>
        <li
          className={`sidebar-list-item ${
            location.pathname === "/restaurants" ? "active" : ""
          }`}
        >
          <a href="/restaurants">
            <BsBuilding className="icon" /> Restaurants
          </a>
        </li>
        <li
          className={`sidebar-list-item ${
            location.pathname === "/statistiscs" ? "active" : ""
          }`}
        >
          <a href="/statistics">
            <BsBarChartFill className="icon" /> Statistics
          </a>
        </li>
      </ul>
    </aside>
  );
};
