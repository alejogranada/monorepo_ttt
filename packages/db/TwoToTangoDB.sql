-- Creación de la base de datos
CREATE DATABASE twototango_db;
USE twototango_db;

-- Creación de la tabla 'user'
CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (username)
);

-- Creación de la tabla 'task'
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


-- Inserciones en la tabla 'user'
INSERT INTO user (username, password) VALUES 
('alice', 'password123'),
('bob', 'securepass'),
('charlie', 'mypassword'),
('dave', '12345678'),
('eve', 'passw0rd');

-- Inserciones en la tabla 'task'
INSERT INTO task (title, description, status, dueDate, userId) VALUES 
('Comprar víveres', 'Comprar leche, huevos, y pan', 'pendiente', '2024-11-10 10:00:00', 1),
('Revisar correos', 'Revisar y responder correos pendientes', 'en_progreso', '2024-11-05 09:00:00', 2),
('Presentación del proyecto', 'Preparar diapositivas para la reunión', 'pendiente', '2024-11-12 15:00:00', 3),
('Llamada con el equipo', 'Reunión semanal con el equipo de desarrollo', 'completada', '2024-11-01 11:00:00', 4),
('Pagar facturas', 'Pagar servicios de luz y agua', 'pendiente', '2024-11-08 17:00:00', 5);
