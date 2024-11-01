# TwoToTango - API Collection

Esta colección de Postman está diseñada para probar las operaciones CRUD de tareas y la autenticación de usuarios en la aplicación TwoToTango.

## Contenido de la Colección

La colección incluye las siguientes funcionalidades:

1. **Registro de Usuario**
   - **Método:** `POST`
   - **URL:** `http://localhost:3001/auth/register`
   - **Cuerpo de la Solicitud:**
     ```json
     {
         "username": "usuario_postman",
         "password": "contrasena_postman"
     }
     ```
   - **Descripción:** Registra un usuario en la base de datos con las credenciales de acceso (nombre de usuario y contraseña).

2. **Inicio de Sesión**
   - **Método:** `POST`
   - **URL:** `http://localhost:3001/auth/login`
   - **Cuerpo de la Solicitud:**
     ```json
     {
         "username": "usuario_prueba",
         "password": "contrasena_segura"
     }
     ```
   - **Descripción:** Genera un token JWT de inicio de sesión si el usuario está registrado.

3. **Crear una Tarea**
   - **Método:** `POST`
   - **URL:** `http://localhost:3001/tasks`
   - **Cabecera:**
     - `Content-Type: application/json`
     - `Authorization: Bearer {{tokenBearer}}`
   - **Cuerpo de la Solicitud:**
     ```json
     {
         "title": "Tarea 1",
         "description": "Descripción de la tarea 1",
         "status": "pendiente",
         "dueDate": "2024/10/31 15:30:00"
     }
     ```
   - **Descripción:** Crea una tarea con los datos básicos. El **status** debe ser uno de los siguientes:
     - pendiente
     - en_progreso
     - completada
   - **Formato de `dueDate`:** `"2024/10/31 15:30:00"`

4. **Obtener Todas las Tareas**
   - **Método:** `GET`
   - **URL:** `http://localhost:3001/tasks`
   - **Cabecera:**
     - `Authorization: Bearer {{tokenBearer}}`
   - **Descripción:** Obtiene todas las tareas del usuario registrado.

5. **Obtener una Tarea por ID**
   - **Método:** `GET`
   - **URL:** `http://localhost:3001/tasks/:id`
   - **Cabecera:**
     - `Authorization: Bearer {{tokenBearer}}`
   - **Descripción:** Obtiene una tarea del usuario registrado por su ID.

6. **Actualizar una Tarea**
   - **Método:** `PUT`
   - **URL:** `http://localhost:3001/tasks/:id`
   - **Cabecera:**
     - `Content-Type: application/json`
     - `Authorization: Bearer {{tokenBearer}}`
   - **Cuerpo de la Solicitud:**
     ```json
     {
         "title": "Tarea 1 Actualizada",
         "description": "Descripción de la tarea actualizada"
     }
     ```
   - **Descripción:** Actualiza una tarea según su ID.

7. **Eliminar una Tarea**
   - **Método:** `DELETE`
   - **URL:** `http://localhost:3001/tasks/:id`
   - **Cabecera:**
     - `Authorization: Bearer {{tokenBearer}}`
   - **Descripción:** Elimina una tarea por su ID.

## Variables de Entorno

- **`tokenBearer`**: Utilizado para almacenar el token JWT de inicio de sesión.

## Requisitos

Asegúrate de que tu servidor está corriendo en `http://localhost:3001` y de que la base de datos está correctamente configurada para que las solicitudes funcionen correctamente.

## Uso

1. Importa esta colección en Postman.
2. Asegúrate de configurar la variable `tokenBearer` después de iniciar sesión.
3. Realiza las pruebas de las operaciones CRUD según sea necesario.

## Notas

- Esta colección está destinada a fines de desarrollo y prueba. Utiliza datos de ejemplo para simular usuarios y tareas.
- Revisa las respuestas del servidor para verificar el correcto funcionamiento de las operaciones.

