

import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardIcon from "../../../assets/DashBoardIcon.svg";
import BoardIcon from "../../../assets/BoardIcon.svg";
import AnalyticsIcon from "../../../assets/AnalyticsIcon.svg";
import SettingsIcon from "../../../assets/SettingsIcon.svg";
import LogoutIcon from "../../../assets/LogoutIcon.svg";
import LogoutPop from '../LogoutPop/LogOutpop'
function Sidebar({ handleSidebarOption }) {
  const [activeItem, setActiveItem] = useState("Board");

  const [showPop, setShowPop] = useState(false);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    handleSidebarOption(itemName);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5001/api/users/logout");
      localStorage.removeItem("token");
      toast.success("Logout successful");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const handleCancel = () => {
    setShowPop(false);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    
  };
  const handleLogoutClick = () => {
    setShowPop(true);
    
  };
  return (
    <div className={styles.sidebar}>
      <div className={`${styles.Dashboard} ${styles.sidebarItem}`}>
       <span> <img src={DashboardIcon} alt="" /></span>
        <div><span>Pro Manage</span></div>
      </div>
      <ul>
        <li
          className={`${styles.sidebarItem} ${
            activeItem === "Board" ? styles.active : ""
          }`}
          onClick={() => handleItemClick("Board")}
        >
          <span>
            <img src={BoardIcon} alt="" />
          </span>
          <span>Board</span>
        </li>
        <li
          className={`${styles.sidebarItem} ${
            activeItem === "Analytics" ? styles.active : ""
          }`}
          onClick={() => handleItemClick("Analytics")}
        >
          <span>
            <img src={AnalyticsIcon} alt="" />
          </span>
          <span>Analytics</span>
        </li>
        <li
          className={`${styles.sidebarItem} ${
            activeItem === "Settings" ? styles.active : ""
          }`}
          onClick={() => handleItemClick("Settings")}
        >
          <span>
            <img src={SettingsIcon} alt="" />
          </span>
          <span>Settings</span>
        </li>
      </ul>
      <div
        className={`${styles.sidebarItem} ${styles.logout}`}
        onClick={handleLogoutClick}
      >
        <span>
          <img src={LogoutIcon} alt="" />
        </span>
        <div><span>Logout</span></div>
      </div>
      {showPop && (
        <div className={styles.deleteLogBackground}>
          <LogoutPop
            onConfirm={handleConfirmLogout}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
