import React, { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import Board from "../components/Dashboard/Board/Board";
import styles from "./DashboardPage.module.css"; 
import Analytics from "../components/Dashboard/Analytics/Analytics";
import Settings from "../components/Dashboard/Settings/Settings";

function DashboardPage() {
  const [selectedOption, setSelectedOption] = useState("Board");

  const handleSidebarOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.Dashboard}>
      <div className={styles.Sidebar}>
        <Sidebar handleSidebarOption={handleSidebarOption} />
      </div>
      <div className={styles.Content}>
        {selectedOption === "Board" && <Board />}
        {selectedOption === "Analytics" && <Analytics />}
        {selectedOption === "Settings" && <Settings />}
        
      </div>
    </div>
  );
}

export default DashboardPage;
