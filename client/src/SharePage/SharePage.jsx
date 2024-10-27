import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SharePage.module.css";
import SkyblueDot from "../assets/SkyblueDot.svg";
import PinkDot from "../assets/PinkDot.svg";
import GreenDot from "../assets/GreenDot.svg";
import { useParams } from "react-router-dom";
function SharePage() {
  const [cardDetails, setCardDetails] = useState(null);
  const { cardId } = useParams();

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/board/task/${cardId}`);
        setCardDetails(response.data);
      } catch (error) {
        console.error("Error fetching card details:", error);
      }
    };

    fetchCardDetails();
  }, [cardId]);

  const formatDate = (dueDate) => {
    if (dueDate == null) return "";
    const date = new Date(dueDate);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const suffix = getDaySuffix(day);
    return `${month} ${day}${suffix}`;
  };

  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const totalCount = cardDetails ? cardDetails.checklist.length : 0;
  const checkedCount = cardDetails
    ? cardDetails.checklist.filter((item) => item.completed).length
    : 0;

  const isDatePassed = (dueDate) => {
    if (!dueDate) return false;
    const now = new Date();
    const due = new Date(dueDate);
    return now > due;
  };

  return (
    <div className={styles.sharePageContainer}>
      <div className={styles.cardDetails}>
        {cardDetails ? (
          <div>
            <p className={styles.priority}>
              {cardDetails.priority === "high" && (
                <img src={PinkDot} alt="High Priority" />
              )}
              {cardDetails.priority === "moderate" && (
                <img src={SkyblueDot} alt="Medium Priority" />
              )}
              {cardDetails.priority === "low" && (
                <img src={GreenDot} alt="Low Priority" />
              )}
              <span className={styles.uppercase}>
                {cardDetails.priority.toUpperCase()} PRIORITY
              </span>
            </p>
            <p className={styles.title}>{cardDetails.title}</p>

            <div>
              <div className={styles.checkedItemByTotalItem}>
                <h4>Checklist</h4>
                <span className={styles.count}>
                  ({checkedCount}/{totalCount})
                </span>
              </div>
              <div
                className={`${styles.cardContainer} ${styles.verticalScrollbar}`}
              >
                <ul className={styles.checklist}>
                  {cardDetails.checklist.map((item, index) => (
                    <li key={index}>
                      <div className={styles.checklistItem}>
                        <input
                          type="checkbox"
                          checked={item.completed}
                          readOnly
                        />
                        <span>{item.task}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              {cardDetails.dueDate !== null && (
                <div className={styles.dateContainer}>
                  <span>Due Date</span>
                  <div
                    className={`${styles.date} ${
                      isDatePassed(cardDetails.dueDate) ? styles.datePassed : ""
                    }`}
                  >
                    {formatDate(cardDetails.dueDate)}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default SharePage;
