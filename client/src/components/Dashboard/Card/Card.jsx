import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import DeletePop from "../DeletePop/DeletePop";
import arrowDown from "../../../assets/arrowDown.png";
import arrowUp from "../../../assets/arrowUp.svg";
import SkyblueDot from "../../../assets/SkyblueDot.svg";
import PinkDot from "../../../assets/PinkDot.svg";
import GreenDot from "../../../assets/GreenDot.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../App.css";
// import { handleAddTask } from "../../../apis/task";
import axios from "axios";

function Card({
  card,
  onStatusButtonClick,
  columnCollapsed,
  handleColumnCollapseToggle,
  column,
  handleEditCard,
  handleDelete,
}) {
  const [editMode, setEditmode] = useState(false);
  const [showAddCardPopup, setShowAddCardPopup] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const checkedCount = card.checklist.filter((item) => item.completed).length;
  const totalCount = card.checklist.length;
  const [currentColumn, setCurrentColumn] = useState(card.status);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showDeletePop, setShowDeletePop] = useState(false);
  const [showFullTitle, setShowFullTitle] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleOptionsToggle = () => {
    setShowOptions(!showOptions);
  };


  const handleChecklistToggle = () => {
    setShowChecklist(!showChecklist);
  };

  const handleTitleClick = () => {
    setShowFullTitle(!showFullTitle); // Toggle the modal on click
  };

  useEffect(() => {
   
    if (columnCollapsed) {
      setShowChecklist(false);
    }
  }, [columnCollapsed]);

  
  const formatDate = (dueDate) => {
    if (dueDate == null) return;
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
  const isOverdue = (dueDate) => {
    const currentDate = new Date().getTime();
    const dueDateTime = new Date(dueDate).getTime();

    if (dueDateTime < currentDate) {
      return true;
    } else {
      return false;
    }
  };

  const copyCardDetailsUrl = () => {
    const cardDetailsUrl = generateCardDetailsUrl();
    navigator.clipboard.writeText(cardDetailsUrl);
    toast.success("Link Copied");
  };

  const generateCardDetailsUrl = () => {
    const cardId = encodeURIComponent(card._id);
    const baseUrl = "https://akash22992000-gmail-com-cuvette-final-evaluation-feb-client.vercel.app/share";

    const url = `${baseUrl}/${cardId}`;
    return url;
  };

  const handleDeleteClick = () => {
    setShowDeletePop(true);
    handleOptionsToggle();
  };

  const handleCancelDelete = () => {
    setShowDeletePop(false);
  };

  const handleConfirmDelete = () => {
    handleDelete(card._id);
    setShowDeletePop(false);
  };

  return (
    <div>
      <div className={styles.card}>
        <div className={styles.cardContainer}>
          <div className={styles.header}>
            <p className={styles.priority}>
              {card.priority === "high" && (
                <img src={PinkDot} alt="High Priority" />
              )}
              {card.priority === "moderate" && (
                <img src={SkyblueDot} alt="Medium Priority" />
              )}
              {card.priority === "low" && (
                <img src={GreenDot} alt="Low Priority" />
              )}
              <span className={styles.uppercase}>
              
                {card.priority.toUpperCase()} PRIORITY
              </span>
            </p>
            <div className={styles.ellipsisMenu} onClick={handleOptionsToggle}>
              <FontAwesomeIcon icon={faEllipsis} />
            </div>
            {showOptions && (
              <div className={styles.options}>
                <button
                  onClick={() => {
                    handleOptionsToggle();
                    handleEditCard(card);
                  }}
                >
                  Edit
                </button>
                <button onClick={copyCardDetailsUrl}>Share</button>

                <button onClick={handleDeleteClick}>Delete</button>
              </div>
            )}
          </div>
           <div className="title-container" style={{ position: 'relative' }}>
      <div
        className={styles.titlebox}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <h4
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
          }}
        >
          {card.title}
        </h4>
      </div>

      {showTooltip && (
        <div className={styles.tooltipbox}>
          {card.title}
        </div>
      )}
      </div>

          <div className={styles.checklistContainer}>
            <div className={styles.checklistInfo}>
              <div className={styles.checkedItemByTotalItem}>
                <h4>Checklist</h4>
                <span>
                  ({checkedCount}/{totalCount})
                </span>
              </div>
              <div
                className={styles.collapseButton}
                onClick={handleChecklistToggle}
              >
                <button>
                  <img
                    src={showChecklist ? arrowUp : arrowDown}
                    alt={showChecklist ? "Collapse" : "Expand"}
                  />
                </button>
              </div>
            </div>

            <div>
              {showChecklist && (
                <div className={styles.checklistItemContainer}>
                  <ul style={{width: '100%'}} className={styles.checklist}>
                    {card.checklist.map((item, index) => (
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
              )}
            </div>
          </div>
        </div>

        <div className={styles.statusButtonContainer}>
          <div className={styles.dueDateContainer}>
            {card.dueDate !== null && (
              <div
                className={`${styles.dueDate} ${
                  isOverdue(card.dueDate) && currentColumn !== "done"
                    ? styles.overdue
                    : ""
                } ${currentColumn === "done" ? styles.doneColumn : ""} ${
                  currentColumn === "done" ? styles.doneDueDate :
                  card.priority === "high" ? styles.highPriority :
                  // card.priority === "moderate" ? styles.moderatePriority :
                  // card.priority === "low" ? styles.lowPriority :
                  ""
                }`}
              >
                {formatDate(card.dueDate)}
              </div>
            )}
          </div>

          <div className={styles.statusButtons}>
            {currentColumn !== "backlog" && (
              <div className={styles.statusButton}>
                <button
                  onClick={() =>
                    onStatusButtonClick(card.status, card._id, "backlog")
                  }
                >
                  BACKLOG
                </button>
              </div>
            )}
            {currentColumn !== "inProgress" && (
              <div className={styles.statusButton}>
                <button
                  onClick={() =>
                    onStatusButtonClick(card.status, card._id, "inProgress")
                  }
                >
                  IN PROGRESS
                </button>
              </div>
            )}
            {currentColumn !== "done" && (
              <div className={styles.statusButton}>
                <button
                  onClick={() =>
                    onStatusButtonClick(card.status, card._id, "done")
                  }
                >
                  DONE
                </button>
              </div>
            )}
            {currentColumn !== "todo" && (
              <div className={styles.statusButton}>
                <button
                  onClick={() =>
                    onStatusButtonClick(card.status, card._id, "todo")
                  }
                >
                  TODO
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showDeletePop && (
        <div className={styles.deletePopBackground}>
          <DeletePop
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        </div>
      )}
     
    </div>
  );
}

export default Card;
