import React, { useState, useEffect } from "react";
import styles from "./Board.module.css";
import Card from "../Card/Card";
import PopUp from "../PopUp/PopUp";
import axios from "axios";
import columnCollapseIcon from "../../../assets/columnCollapseIcon.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropDownIcon from "../../../assets/DropDownIcon.svg";
import AddPeopleIcon from "../../../assets/AddPeopleIcon.png";
import Plus from "../../../assets/Plus.svg";
import { formatCurrentDate } from "../../UI/dateUtils";
import AddPeople from '../AddPeople/AddPeople';
import styless from '../AddPeople/AddPeople.module.css';

function Board() {
  const [editCardIndex, setEditCardIndex] = useState(null);
  const [editableCard, setEditableCard] = useState(null);
  const [cards, setCards] = useState({
    backlog: [],
    todo: [],
    inProgress: [],
    done: [],
  });

  const [showAddCardPopup, setShowAddCardPopup] = useState(false);
  const [columnCollapsed, setColumnCollapsed] = useState({
    backlog: false,
    todo: false,
    inProgress: false,
    done: false,
  });

  // const [showAddPeoplePopup, setShowAddPeoplePopup] = useState(false);
  const [showAddPeoplePopup, setShowAddPeoplePopup] = useState(false);
  const [addedEmail, setAddedEmail] = useState("");

  // const handleAddPeoplePopup = () => {
  //   setShowAddPeoplePopup(true);
  // };

  const handleAddEmail = (email) => {
    setAddedEmail(email);
    setShowAddPeoplePopup(false); // Close Add Email popup
  };
  const handleAddPeoplePopup = () => {
    setShowAddPeoplePopup(true);
  };

  const handleAddPeople = (email) => {
    setShowAddPeoplePopup(false);
  };

  const handleCancelAddPeople = () => {
    setShowAddPeoplePopup(false);
  };

  const [filterOption, setFilterOption] = useState("This week");
  const [selectedOption, setSelectedOption] = useState("This week");
  const options = ["This week", "This Month", "Today"];

  const handleFilterChange = (option) => {
    setFilterOption(option);
  };

  const handleDropdownClick = () => {
    const dropdownOptions = document.getElementById("dropdownOptions");
    if (
      dropdownOptions.style.display === "none" ||
      !dropdownOptions.style.display
    ) {
      dropdownOptions.style.display = "block";
    } else {
      dropdownOptions.style.display = "none";
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setFilterOption(option);
    const dropdownOptions = document.getElementById("dropdownOptions");
    dropdownOptions.style.display = "none";
  };

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        if (!token) {
          return;
        }

        const response = await axios.get("http://localhost:5001/api/board/task", {
          params: { filterOption },
        });

        const groupedColumns = {
          backlog: [],
          todo: [],
          inProgress: [],
          done: [],
        };

        response.data.forEach((card) => {
          groupedColumns[card.status].push(card);
        });

        setCards(groupedColumns);
      } catch (error) {
        toast.error("Error fetching card. Please try again later.");
      }
    };
    fetchBoardData();
  }, [filterOption]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;

      await axios.delete(`http://localhost:5001/api/board/task/${id}`);

      setCards((prevCards) => {
        const updatedCards = { ...prevCards };
        for (const column of Object.keys(updatedCards)) {
          updatedCards[column] = updatedCards[column].filter(
            (item) => item._id !== id
          );
        }
        return updatedCards;
      });
      toast.success("Card deleted successfully");
    } catch (error) {
      toast.error("Error deleting card. Please try again later.");
    }
  };

  const handleAddCard = (newTask) => {
    const column = newTask.status;
    const updatedCards = { ...cards };
    const cardIndex = updatedCards[column].findIndex(
      (card) => card._id === newTask._id
    );

    if (cardIndex !== -1) {
      updatedCards[column][cardIndex] = { ...newTask, id: newTask._id };
      toast.success("Card Edited successfully");
      setEditableCard(null);
    } else {
      updatedCards[column].push({ ...newTask, id: newTask._id });
      toast.success("Card Saved successfully");
    }

    setCards(updatedCards);
    setShowAddCardPopup(false);
  };

  const handleMoveCard = async (column, id, targetColumn) => {
    try {
      const updatedCards = { ...cards };
      const cardIndex = updatedCards[column].findIndex(
        (card) => card._id === id
      );

      if (cardIndex !== -1) {
        const [movedCard] = updatedCards[column].splice(cardIndex, 1);
        movedCard.column = targetColumn;
        updatedCards[targetColumn].push(movedCard);
        setCards(updatedCards);

        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        movedCard.status = targetColumn;
        await axios.put(`http://localhost:5001/api/board/task/${id}`, movedCard);
      } else {
        Object.keys(updatedCards).forEach((col) => {
          const index = updatedCards[col].findIndex((card) => card.id === id);
          if (index !== -1) {
            const [movedCard] = updatedCards[col].splice(index, 1);
            movedCard.column = targetColumn;
            updatedCards[targetColumn].push(movedCard);
            setCards(updatedCards);
          }
        });
      }
    } catch (error) {}
  };

  const handleEllipsesMenuClick = (id) => {};

  const handleColumnCollapseToggle = (column) => {
    setColumnCollapsed({
      ...columnCollapsed,
      [column]: !columnCollapsed[column],
    });
  };

  const handleEditCard = (editableCard) => {
    setEditableCard(editableCard);
    setShowAddCardPopup(true);
  };

  const handlePopup = () => {
    setShowAddCardPopup(false);
    setEditableCard(null);
  };

  const handleName = () => {
    return localStorage.getItem("name") || "";
  };

  const currentDate = formatCurrentDate();

  return (
    <div className={styles.board}>
      <div className={styles.header}>
        <div className={styles.leftSection}>
          Welcome! {handleName()}
          <div className={styles.boardText}>Board</div>
          <div className={styles.addPeopleSection} onClick={handleAddPeoplePopup}>
            <img src={AddPeopleIcon} alt="Add People Icon" className={styles.addPeopleIcon} />
            <span className={styles.addPeopleText}>Add People</span>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.date}>{currentDate}</div>
          <div className={styles.customDropdown}>
            <div
              className={styles.selectedOption}
              onClick={handleDropdownClick}
            >
              <div className={styles.dropdownIcon}>
                <img src={DropDownIcon} alt="Dropdown Icon" />
              </div>
              {selectedOption}
            </div>

            <div className={styles.options} id="dropdownOptions">
              {options.map((option) => (
                <div
                  key={option}
                  className={styles.option}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.columns} ${styles.horizontalScrollbar}`}>
        {Object.keys(cards).map((column) => (
          <div
            key={column}
            className={`${styles.column} ${
              columnCollapsed[column] ? styles.collapsed : ""
            }`}
          >
            <h3>
              {column === "inProgress"
                ? "In Progress"
                : column.charAt(0).toUpperCase() + column.slice(1)}{" "}
              <div className={styles.addBtn}>
                {column === "todo" && (
                  <button
                    className={styles.addCardButton}
                    onClick={() => setShowAddCardPopup(true)}
                  >
                    <img src={Plus} alt="Not found" />
                  </button>
                )}
                <button onClick={() => handleColumnCollapseToggle(column)}>
                  <img src={columnCollapseIcon} alt="collapse not found" />
                </button>
              </div>
            </h3>

            <div
              className={`${styles.cardContainer} ${styles.verticalScrollbar}`}
            >
              {cards[column].map((card) => (
                <Card
                  key={card.id}
                  card={card}
                  onMoveCard={(id, targetColumn) =>
                    handleMoveCard(column, id, targetColumn)
                  }
                  onEllipsesMenuClick={() => handleEllipsesMenuClick(card.id)}
                  onStatusButtonClick={(currentColumn, id, targetColumn) =>
                    handleMoveCard(currentColumn, id, targetColumn)
                  }
                  showAddCardPopup={showAddCardPopup}
                  columnCollapsed={columnCollapsed[column]}
                  handleColumnCollapseToggle={handleColumnCollapseToggle}
                  column={column}
                  handleEditCard={handleEditCard}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {showAddCardPopup && (
        <PopUp
          onSave={handleAddCard}
          onCancel={handlePopup}
          editableCard={editableCard}
        />
      )}
        {showAddPeoplePopup && (
          <AddPeople
          onAddPeople={handleAddEmail}
          onCancel={() => setShowAddPeoplePopup(false)}
        />
        )}
         {addedEmail && ( 
        <div className={styless.modalOverlay}>
        <div className={styless.modalContent}>
          <p>{addedEmail} added to the board</p>
          <button onClick={() => setAddedEmail("")} className={styless.okayBtn}>Ok, Got it</button>
        </div>
      </div>
       )}
      
    </div>
  );
}

export default Board;
