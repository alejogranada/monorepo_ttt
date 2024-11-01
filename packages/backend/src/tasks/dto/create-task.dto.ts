// src/tasks/dto/create-task.dto.ts
import { IsString, IsOptional, IsNotEmpty, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

enum TaskStatus {
    PENDING = 'pendiente',
    IN_PROGRESS = 'en_progreso',
    COMPLETED = 'completada',
}

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @Type(() => Date)
    @IsDate({ message: 'dueDate debe ser una fecha válida' })
    @IsOptional()
    dueDate?: Date;

    @IsNotEmpty()
    @IsEnum(TaskStatus, { message: 'status debe ser uno de: pendiente, en_progreso, completada' })
    status: TaskStatus;
}