const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Task = require("../models/Task");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");


// ======================
// GET ALL USERS
// ======================
router.get("/users", protect, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// ======================
// GET ALL TASKS
// ======================
router.get("/tasks", protect, admin, async (req, res) => {
  try {
    const tasks = await Task.find().populate("user", "name email");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// ======================
// DELETE ANY TASK
// ======================
router.delete("/tasks/:id", protect, admin, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.json({
      message: "Task deleted by admin",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;