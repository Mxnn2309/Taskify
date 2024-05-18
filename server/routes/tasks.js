const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

const { getTasks, getTask, createTask, deleteTask, updateTask } = require('../controllers/tasksController');

router.use(requireAuth);

// GET all tasks
router.get('/', getTasks);

// GET a single task
router.get('/:id', getTask);

// POST a new task
router.post('/', createTask);

// DELETE a single task
router.delete('/:id', deleteTask);

// UPDATE a single task
router.put('/:id', updateTask);

module.exports = router;
