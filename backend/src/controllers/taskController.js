const Task = require('../models/Task');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @desc    Get all user tasks (with search, filter, sorting, pagination)
 * @route   GET /api/tasks
 * @access  Private
 */
const getTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Build the query object
    const query = { userId };

    // Search filter (regex search on title & description)
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
      ];
    }

    // Status filter
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Priority filter
    if (req.query.priority) {
      query.priority = req.query.priority;
    }

    // Pagination parameters
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Sorting parameters
    let sortField = 'createdAt';
    let sortOrder = -1; // Default: Newest first

    if (req.query.sortBy) {
      sortField = req.query.sortBy;
    }
    if (req.query.sortOrder) {
      sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    }

    const sort = { [sortField]: sortOrder };

    // Perform query with count
    const totalRecords = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalRecords / limit);

    return sendSuccess(res, {
      tasks,
      totalPages,
      currentPage: page,
      totalRecords,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single task by ID
 * @route   GET /api/tasks/:id
 * @access  Private
 */
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });

    if (!task) {
      return sendError(res, 'Task not found or unauthorized', 404);
    }

    return sendSuccess(res, task);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Private
 */
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      status: status || 'Pending',
      priority: priority || 'Medium',
      dueDate: dueDate || null,
      userId: req.user.id,
    });

    return sendSuccess(res, task, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing task
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
const updateTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    // Find and verify ownership
    let task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) {
      return sendError(res, 'Task not found or unauthorized', 404);
    }

    // Update fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate || null;

    const updatedTask = await task.save();

    return sendSuccess(res, updatedTask);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a task
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
const deleteTask = async (req, res, next) => {
  try {
    const result = await Task.deleteOne({ _id: req.params.id, userId: req.user.id });

    if (result.deletedCount === 0) {
      return sendError(res, 'Task not found or unauthorized', 404);
    }

    return sendSuccess(res, { id: req.params.id, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle task status (Completed / Pending)
 * @route   PATCH /api/tasks/:id/status
 * @access  Private
 */
const toggleTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) {
      return sendError(res, 'Task not found or unauthorized', 404);
    }

    task.status = status;
    const updatedTask = await task.save();

    return sendSuccess(res, updatedTask);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
};
