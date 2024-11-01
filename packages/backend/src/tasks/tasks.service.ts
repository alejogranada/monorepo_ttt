import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Task, TaskStatus } from './task.entity';
import { User } from '../users/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) {}

    /*
    async createTask(taskData: Partial<Task>, userId: number): Promise<Task> {
        const task = new Task();
        task.title = taskData.title;
        task.description = taskData.description;
        task.dueDate = taskData.dueDate; // Puede ser null
        task.status = taskData.status;
        task.userId = userId;
        return this.tasksRepository.save(task);
    }
    */

    async createTask(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
        const task = this.tasksRepository.create({
            ...createTaskDto,
            userId,
            status: createTaskDto.status as unknown as DeepPartial<TaskStatus>, // Conversión intermedia a unknown
        });
    
        return this.tasksRepository.save(task);
    }

    async getTasks(user: User): Promise<Task[]> {
        return this.tasksRepository.find({ where: { user } });
    }

    async getTaskById(id: number, user: User): Promise<Task> {
        const task = await this.tasksRepository.findOne({ where: { id, user } });
        if (!task) {
            throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
        }
        return task;
    }

    async updateTask(id: number, taskData: Partial<Task>, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);
        Object.assign(task, taskData);
        return this.tasksRepository.save(task);
    }

    async deleteTask(id: number, user: User): Promise<void> {
        const result = await this.tasksRepository.delete({ id, user });
        if (result.affected === 0) {
            throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
        }
    }

}