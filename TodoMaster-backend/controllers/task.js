import Task from '../models/task.js';

export const getTasks = async (req, res) => {
    const userId = req.user._id;

    const tasks = await Task.find({ user: userId });

    res.status(200).json({ 
        success: true,
        tasks: tasks 
    });
}

export const createTask = async (req, res) => {
    const { title, description } = req.body;

    const task = await Task.create({
        title,
        description,
        user: req.user
    });

    res.status(201).json({
        success: true,
        task: task
    });
}

export const updateTask = async (req, res) => {
    const { id } = req.body;

    const query = {}

    if (req.body.title) query.title = req.body.title
    if (req.body.description) query.description = req.body.description

    await Task.findByIdAndUpdate(id, query);

    res.status(200).json({
        success: true,
        message: "Task updated successfully."
    });
}

export const deleteTask = async (req, res) => {
    const { id } = req.body;

    await Task.findByIdAndRemove(id);

    res.status(200).json({ 
        success: true,
        message: "Task deleted successfully." 
    });
}