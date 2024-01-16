const Task = require("../models/Task");

// Create Task Controller
exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const userId = req.userId;
    const task = new Task({ title, description, deadline, userId });

    await task.save();

    res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get TaskByUser Controller
exports.getTaskByUser = async (req, res) => {
  const userId = req.userId;

  try {
    const tasks = await Task.find({ userId });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Task Controller
exports.updateTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Task Controller
exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    await Task.findByIdAndDelete(taskId);
    res.status(204).send();
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
