const Task = require('../model/Task');
const Joi = require('joi');

// Validation schema
const taskSchema = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().optional(),
  status: Joi.string().valid('TODO', 'IN_PROGRESS', 'COMPLETED'),
  priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH'),
  dueDate: Joi.date().optional(),
});

// Create task
exports.createTask = async (req, res) => {
  try {
    const { error } = taskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const task = await new Task(req.body);
    await task.save()
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get tasks
exports.getTasks = async (req, res) => {
  const {status,priority,sort,limit=5,skip=0}= req.query
  try {
    const check= {}
    if (status){
      check.status=status
    }
    if(priority){
      check.priority=priority
    }
    const tasks= await Task.find(check)
      .sort(sort ==="dueDate" ? {dueDate: 1}: {createTask: 1})
      .limit(parseInt(limit))
      .skip(parseInt(skip))

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task){
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const { error } = taskSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const task = await Task.findByIdAndUpdate(req.params.id, req.body);
    if (!task){
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(204).json({message:"Task deleted successfully"});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
