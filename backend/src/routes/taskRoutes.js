const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { createTaskRules, updateTaskRules, updateStatusRules } = require('../validations/taskValidation');
const validate = require('../middleware/validateMiddleware');

// Protect all routes below this line
router.use(protect);

// Task routes
router
  .route('/')
  .get(getTasks)
  .post(createTaskRules, validate, createTask);

router
  .route('/:id')
  .get(getTaskById)
  .put(updateTaskRules, validate, updateTask)
  .delete(deleteTask);

router.patch('/:id/status', updateStatusRules, validate, toggleTaskStatus);

module.exports = router;
