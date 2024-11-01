import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

export enum TaskStatus {
    PENDING = 'pendiente',
    IN_PROGRESS = 'en_progreso',
    COMPLETED = 'completada',
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
    status: TaskStatus;

    @Column({ type: 'datetime', nullable: true })
    dueDate?: Date; // Opcional

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;
}