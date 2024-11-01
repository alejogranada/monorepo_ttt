import { Controller, Post, Get, Param, Put, Delete, Body, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private tasksService: TasksService) {}

    /*
    @Post()
    async create(@Body() taskData: Partial<Task>, @Request() req): Promise<Task> {
        return this.tasksService.createTask(taskData, req.user.id);
    }
    */

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto, @Request() req): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, req.user.id);
    }

    @Get()
    async getAll(@Request() req): Promise<Task[]> {
        return this.tasksService.getTasks(req.user);
    }

    @Get(':id')
    async getOne(@Param('id') id: number, @Request() req): Promise<Task> {
        return this.tasksService.getTaskById(id, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() taskData: Partial<Task>, @Request() req): Promise<Task> {
        return this.tasksService.updateTask(id, taskData, req.user);
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Request() req): Promise<void> {
        return this.tasksService.deleteTask(id, req.user);
    }
}