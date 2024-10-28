import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Analytics.module.css";

function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  console.log(analyticsData);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = token;
        } else {
          console.log("No token found");
          return;
        }

        const response = await axios.get("https://akash22992000-gmail-com-cuvette-final-evaluation-feb-server.vercel.app/api/board/task/analytics");
        setAnalyticsData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div>
      <h1>Analytics</h1>
      {analyticsData ? (
        <div class="listContainer">
          <ul className={styles.firstList}>
            <li>Backlog Tasks: {analyticsData.statusCount.backlog}</li>
            <li>To-do Tasks: {analyticsData.statusCount.todo}</li>
            <li>In-Progress Tasks: {analyticsData.statusCount.inProgress}</li>
            <li>Completed Tasks: {analyticsData.statusCount.done}</li>
          </ul>
          <ul className={styles.secondList}>
            <li>Low Priority: {analyticsData.priorityCount.low}</li>
            <li>Moderate Priority: {analyticsData.priorityCount.moderate}</li>
            <li>Due Date Tasks: {analyticsData.dueDateCount}</li>
            <li>High Priority: {analyticsData.priorityCount.high}</li>
          </ul>
        </div>
      ) : (
        <p>Loading analytics...</p> // Display a loading message
      )}
    </div>
  );
}

export default Analytics;
