import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'mysqldbALEJO',
            database: 'twototango_db',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        UsersModule,
        AuthModule,
        TasksModule,
    ],
})
export class AppModule {}
