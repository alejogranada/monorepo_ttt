# Base de Datos `twototango_db`

Este proyecto define una base de datos llamada `twototango_db` para gestionar usuarios y sus tareas, diseñada para el motor **MySQL**.

## Requisitos

- Motor de base de datos: **MySQL** (versión recomendada: 5.7 o superior)

## Estructura de la Base de Datos

### Creación de la Base de Datos

Ejecuta el siguiente comando en MySQL para crear y seleccionar la base de datos:

```sql
CREATE DATABASE twototango_db;
USE twototango_db;
```

## Tablas
### Tabla user
Almacena información de los usuarios registrados.

id: Identificador único del usuario (AUTO_INCREMENT).
username: Nombre de usuario (debe ser único).
password: Contraseña del usuario.
SQL:

```
CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (username)
);
```

### Tabla task
Almacena las tareas de los usuarios.

id: Identificador único de la tarea (AUTO_INCREMENT).
title: Título de la tarea.
description: Descripción de la tarea.
status: Estado de la tarea (pendiente, en_progreso, completada).
dueDate: Fecha de vencimiento de la tarea.
userId: Clave foránea que referencia al usuario (user.id).

SQL:
```
CREATE TABLE task (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  status ENUM('pendiente', 'en_progreso', 'completada') NOT NULL DEFAULT 'pendiente',
  dueDate DATETIME DEFAULT NULL,
  userId INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES user(id)
);
```

## Uso
user: Almacena datos de usuarios para autenticación.
task: Permite gestionar las tareas asociadas a cada usuario.

### Instrucciones
Copia el script SQL y ejecútalo en tu entorno MySQL.
