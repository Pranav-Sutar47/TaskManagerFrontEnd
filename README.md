TaskManager

1. Frontend (React)
Components:
TaskList: Displays all tasks.
TaskItem: Represents each individual task.
AddTaskForm: A form to add a new task.
TaskEditModal: Modal for editing tasks.

2. Backend (Node.js + Express)
Routes:
GET /tasks: Get all tasks.
POST /tasks: Add a new task.
PUT /tasks/:id: Update an existing task.
DELETE /tasks/:id: Delete a task.
Controllers: Handle the logic for these routes.
Middleware: Use JWT authentication middleware for secure access to routes.

3. Database (MongoDB)
CRUD Operations: Perform create, read, update, and delete operations through your Express routes.

4. Authentication
Implement user authentication with JWT (JSON Web Tokens) to secure task management.
Login and Register routes on the backend with JWT issuance upon successful authentication.

Tools:
Thunder Client: For testing APIs.
MongoDB Atlas: Cloud-based MongoDB instance.
Netlify: For deploying frontend of application.
Render : For deploying backend of application.
