import { Injectable } from '@nestjs/common';
import { v1 } from 'uuid';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters({ status, search }: GetTasksFilterDto): Task[] {
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => (task.status = status));
        }

        if (search) {
            tasks = tasks.filter(
                task =>
                    task.title.includes(search) ||
                    task.description.includes(search)
            );
        }

        return tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    createTask({ title, description }: CreateTaskDto): Task {
        const task: Task = {
            id: v1(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task: Task = this.getTaskById(id);
        task.status = status;

        return task;
    }
}
