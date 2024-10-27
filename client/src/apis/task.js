import axios from "axios";

export const handleAddTask = async (newTask, onSave, setNewTask) => {
  try {
    // Make a POST request to save the new task data
    const response = await axios.post("http://localhost:5001/api/board/task", newTask);
    console.log("New task saved:", response.data);
    onSave(response.data); // Pass the saved task data to the parent component
    setNewTask({
      title: "",
      priority: "",
      checklist: [],
      dueDate: null,
    });
  } catch (error) {
    console.error("Error saving task:", error);
    // Handle error
  }
};
