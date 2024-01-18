const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const verifyToken = require("../middleware/authMiddleware");

// Task API Routes
router.post("/", verifyToken, taskController.createTask);
router.get("/user/:userId", verifyToken, taskController.getTaskByUser);
router.get("/today/:userId", verifyToken, taskController.getTaskTodayByUser);
router.put("/:id", verifyToken, taskController.updateTask);
router.delete("/:id", verifyToken, taskController.deleteTask);

module.exports = router;
