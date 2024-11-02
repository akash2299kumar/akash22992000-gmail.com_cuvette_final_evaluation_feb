import React, { useEffect, useState } from "react";
import styles from "./PopUp.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk, faTrash } from "@fortawesome/free-solid-svg-icons";
import SkyblueDot from "../../../assets/SkyblueDot.svg";
import PinkDot from "../../../assets/PinkDot.svg";
import GreenDot from "../../../assets/GreenDot.svg";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Plus from "../../../assets/Plus.svg";
import DropDown from "../../../assets/arrowDown.png"

import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PopUp({ onSave, onCancel, editableCard }) {
  useEffect(() => {});
  const [date, setDate] = useState(null);
  const [users, setUsers] = useState([]); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "",
    checklist: [],
    dueDate: null,
    status: "todo",
    assignedTo: "" 
  });

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://akash22992000-gmail-com-cuvette-final-evaluation-feb-server.vercel.app/api/board/getAllUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const assignTaskToUser = (email) => {
    setNewTask((prevState) => ({
      ...prevState,
      assignedTo: email
    }));
    setIsDropdownOpen(false); // Close dropdown after assignment
    toast.success(`Task assigned to ${email}`);
  };


  useEffect(() => {
    if (editableCard) {
      setNewTask({
        title: editableCard.title,
        priority: editableCard.priority,
        checklist: editableCard.checklist,
        dueDate: editableCard.dueDate ? new Date(editableCard.dueDate) : null,
        status: editableCard.status,
           assignedTo: editableCard.assignedTo || ""
      });
      setDate(editableCard.dueDate ? new Date(editableCard.dueDate) : null);
    }
  }, [editableCard]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddTask = async () => {
    try {
      if (newTask.title.trim() === "" || newTask.priority.trim() === "" || newTask.checklist.length === 0) {
        
        toast.error("Title, priority, and checklist are mandatory fields.");
        return;
      
      }
      if (newTask.checklist.some(item => item.task.trim() === '')) {
        toast.error("Please fill the checklist item before saving");
        return;
      }
     

      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;

      if (editableCard) {
        const response = await axios.put(
          `https://akash22992000-gmail-com-cuvette-final-evaluation-feb-server.vercel.app/api/board/task/${editableCard._id}`,
          newTask
        );
        onSave(response.data);
      } else {
        const response = await axios.post("https://akash22992000-gmail-com-cuvette-final-evaluation-feb-server.vercel.app/api/board/task", newTask);
        onSave(response.data);
      }

      setNewTask({
        title: "",
        priority: "",
        checklist: [],
        dueDate: null,
        status: "todo",
        assignedTo: ""
      });
    } catch (error) {
      toast.error("Error Saving Task");
    }
  };

  const handleAddChecklistItem = () => {
    if (newTask.checklist.some(item => item.task.trim() === '')) {
      toast.error("Please fill the checklist item before adding a new one.");
      return;
    }
    setNewTask((prevState) => ({
      ...prevState,
      checklist: [...prevState.checklist, { task: "", completed: false }],
    }));
  };

  const handleChecklistChange = (index, value) => {
    setNewTask((prevState) => ({
      ...prevState,
      checklist: prevState.checklist.map((item, i) =>
        i === index ? { ...item, task: value } : item
      ),
    }));
  };

  const handleDeleteChecklistItem = (index) => {
    setNewTask((prevState) => ({
      ...prevState,
      checklist: prevState.checklist.filter((item, i) => i !== index),
    }));
  };

  const handleToggleCompletion = (index) => {
    setNewTask((prevState) => ({
      ...prevState,
      checklist: prevState.checklist.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  const handleDateChange = (date) => {
    setDate(date);
    setNewTask((prevState) => ({
      ...prevState,
      dueDate: date,
    }));
  };


  useEffect(() => {
    console.log(newTask);
  }, [newTask.dueDate]);


  const completedCount = newTask.checklist.filter(
    (item) => item.completed
  ).length;
  const totalCount = newTask.checklist.length;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <h1>Title</h1>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faAsterisk} />
            </span>
          </div>
          <input
            type="text"
            name="title"
            placeholder="Enter Task Title"
            value={newTask.title}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.priorityRow}>
          <label>
            <h1>Select Priority</h1>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faAsterisk} />
            </span>
          </label>
          <div className={styles.priorityButtons}>
            <button
              className={newTask.priority === "high" ? styles.active : ""}
              onClick={() =>
                handleInputChange({
                  target: { name: "priority", value: "high" },
                })
              }
            >
              <img src={PinkDot} alt="" />
              HIGH PRIORITY
            </button>
            <button
              className={newTask.priority === "moderate" ? styles.active : ""}
              onClick={() =>
                handleInputChange({
                  target: { name: "priority", value: "moderate" },
                })
              }
            >
              <img src={SkyblueDot} alt="" />
              MODERATE PRIORITY
            </button>
            <button
              className={newTask.priority === "low" ? styles.active : ""}
              onClick={() =>
                handleInputChange({
                  target: { name: "priority", value: "low" },
                })
              }
            >
              <img src={GreenDot} alt="" />
              LOW PRIORITY
            </button>
          </div>
        </div>
        <div className={styles.assignToSection}>
          <h4>Assign to</h4>
          <input
            type="text"
            name="assignedTo"
            placeholder="Add an assignee"
            value={newTask.assignedTo}
            readOnly
          />
          <img
            src={DropDown}
            alt="Dropdown Icon"
            className={styles.dropdownIcon}
            onClick={toggleDropdown}
          />
            {isDropdownOpen && (
  <div className={styles.dropdownMenu}>
    {console.log(users)} {/* Log the users array */}
    {users.map((email, index) => (
      <div key={index} className={styles.dropdownItem}>
        <div className={styles.avatar}>
          {/* Use email directly since it's a string */}
          {email.slice(0, 2).toUpperCase()}
        </div>
        <span>{email}</span>
        <button style={{
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid black',
    width: '20%',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '12px',
    cursor: 'pointer'
  }} onClick={() => assignTaskToUser(email)}>Assign</button>
      </div>
    ))}
            </div>
        
  )}
        </div>
        <div>
          <div className={styles.checklistWrapper}>
            <div className={styles.checklistContainer}>
              <div className={styles.updateChecklist}>
                <h4>Checklist</h4>
                <span>
                  ({completedCount}/{totalCount})
                </span>
                <span className={styles.icon}>
                  <FontAwesomeIcon icon={faAsterisk} />
                </span>
              </div>
              <div className={styles.checklistItems}>
                {newTask.checklist.map((item, index) => (
                  <div key={index} className={styles.checklist}>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleToggleCompletion(index)}
                    />

                    <input
                      type="text"
                      value={item.task}
                      onChange={(e) =>
                        handleChecklistChange(index, e.target.value)
                      }
                      className={styles.inputText}
                    />
                    <button onClick={() => handleDeleteChecklistItem(index)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className={styles.deleteIcon}
                      />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={handleAddChecklistItem}>
                <span>
                  <img src={Plus} alt="" />
                </span>
                <span>Add New</span>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.actionButtonsContainer}>
          <div className={styles.DatePickerContainer}>
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              placeholderText="Select Due Date"
              dateFormat="dd/MM/yyyy"
               minDate={new Date()}
              className={styles.DatePicker}
            />
          </div>

          <div className={styles.cancel} onClick={onCancel}>
            <button>Cancel</button>
          </div>
          <div className={styles.save} onClick={handleAddTask}>
            <button>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
