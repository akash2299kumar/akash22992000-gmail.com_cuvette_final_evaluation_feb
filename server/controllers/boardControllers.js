
const Task = require("../models/taskModels");
const User = require("../models/usersModel");
const mongoose = require("mongoose");
const moment = require("moment");
const Board = require("../models/Board");

exports.createTask = async (req, res) => {
  try {
    const { title, priority, checklist, dueDate } = req.body;
    const userId = req.body.userId;
    const newTask = new Task({
      title,
      priority,
      checklist,
      dueDate,
      status: "todo",
      userId,
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    
    res.status(500).send("Server Error");
  }
};

exports.editTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { title, priority, checklist, dueDate, status } = req.body;
    let task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.title = title;
    task.priority = priority;
    task.checklist = checklist;
    task.dueDate = dueDate;
    task.status = status;
    await task.save();
    res.json(task);
  } catch (error) {
 
    res.status(500).send("Server Error");
  }
};
exports.getTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { title, priority, checklist, dueDate, status } = req.body;
    let task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
   
    res.status(500).send("Server Error");
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
   
    res.status(500).send("Server Error");
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { filterOption } = req.query;

    let startDate, endDate;

    switch (filterOption) {
      case "This week":
        startDate = moment().startOf("isoWeek").toDate();
        endDate = moment().endOf("day").toDate();
        break;
      case "This Month":
        startDate = moment().startOf("month").toDate();
        endDate = moment().endOf("day").toDate(); 
        break;
      case "Today":
        startDate = moment().startOf("day").toDate();
        endDate = moment().endOf("day").toDate();
        break;
      case "All":
        startDate = moment(0).toDate(); 
        endDate = new Date();
        break;
      default:
        return res.status(400).json({ message: "Invalid filterOption" });
    }

    let query = { createdAt: { $gte: startDate, $lte: endDate } };

    if (userId) {
      query.userId = userId;
    }

    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

exports.getTaskAnalytics = async (req, res) => {
  try {
    const userId = req.body.userId; // Assuming you pass the userId as a query parameter

    // If you want analytics specific to a user, add userId to the query
    const query = userId ? { userId } : {};

    // Fetch all tasks based on the query
    const tasks = await Task.find(query);

    // Initialize counters for status and priority
    const statusCount = {};
    const priorityCount = {};
    let dueDateCount = 0;

    // Iterate over the tasks to count statuses and priorities
    tasks.forEach((task) => {
      // Count status
      if (task.status) {
        statusCount[task.status] = (statusCount[task.status] || 0) + 1;
      }

      // Count priority
      if (task.priority) {
        priorityCount[task.priority] = (priorityCount[task.priority] || 0) + 1;
      }
      if (task.dueDate !== null && task.dueDate !== undefined) {
        dueDateCount++;
      }

    });

    // Prepare the final response
    const analytics = {
      statusCount,
      priorityCount,
      dueDateCount,
    };
    console.log(tasks);

    return res.json(analytics);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};




exports.getAllUsers = async (req, res) => {
  try {
    console.log("Fetching users...");
    //  Fetch emails from the User model
    const users = await User.find({}, 'email');
    console.log("Users fetched:", users);

    //  Fetch emails from the Board model's people array
    const boards = await Board.find({}, 'people.email'); // Retrieve only the emails from the people array
    console.log("Boards fetched:", boards);

    const boardEmails = boards.flatMap(board => board.people.map(person => person.email)); // Flatten the array
    console.log("Board Emails:", boardEmails);

    // Combine unique emails
    const allEmails = [...new Set([...users.map(user => user.email), ...boardEmails])];
    console.log("All Emails:", allEmails);

    // Return combined emails
    res.json(allEmails);
  } catch (error) {
    console.error("Error fetching users and boards:", error); 
    res.status(500).send("Server Error");
  }
};
