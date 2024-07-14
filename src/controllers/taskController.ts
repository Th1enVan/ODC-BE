import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Task } from "../entities/Tasks";

const taskRepository = AppDataSource.getRepository(Task);

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await taskRepository.find();
    res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
    const { name, startDate, endDate } = req.body;

    if (!name || name.length > 80) {
        return res.status(400).json({ error: "Task name is required and should not exceed 80 characters." });
    }

    if (endDate && !startDate) {
        return res.status(400).json({ error: "Start date is required if end date is provided." });
    }

    const task = new Task();
    task.name = name;
    task.startDate = startDate;
    task.endDate = endDate;

    await taskRepository.save(task);
    res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
    const { name, startDate, endDate } = req.body
    const { id } = req.params

    const task = await taskRepository.findOneBy({ id: parseInt(id) });

    if (!task) {
        res.status(404).json({ error: "Can not find the task for updating! " });
    } else {
        if (name && name.length <= 80) task.name = name;
        if (startDate) task.startDate = startDate;
        if (endDate) task.endDate = endDate;
        
        await taskRepository.save(task)
    }

    res.status(200).json(task);
}

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params

    const task = await taskRepository.findOneBy({ id: parseInt(id) });

    if (!task) {
        res.status(404).json({ error: 'Task not Found!' })
    } else {
        await taskRepository.remove(task)
        res.status(200).json({ message: "Task deleted successfully" })
    };
}