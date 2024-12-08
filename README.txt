# Task Management API

This is a RESTful Task Management API built with Node.js, Express.js, and MongoDB. It demonstrates backend development, database interactions, and API design.

## Features
- CRUD operations for task management.
- Filter and sort tasks by status, priority, and dates.
- Pagination for task retrieval.
- Centralized error handling.
- User authentication using JWT (JSON Web Token).
---

## Prerequisites
Make sure you have the following installed:

- [Node.js](https://nodejs.org) (v14 or later)
- [MongoDB_Altas](https://www.cloud.mongodb.com/)
- [Postman](https://www.postman.com/) or cURL for testing (optional)

---

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the following:

```env
MONGO_URI= mongodb_altas_connnection_url
SECRET_KEY=your_secret_key
```
Replace `mongodb_altas_connnection_url` and `your_secret_key` with your actual MongoDB connection string and desired secret key.

### 4. Run the Server
```bash
node main.js
```
The server will start on `http://localhost:5000`.

---

## First i create a mongoose_schema in model/Task.js and then after i write the logics of create, get, update and delete in controllers/taskController.js file 


## API Endpoints

### **Task Management**

#### 1. Create a Task
**POST /tasks**

Request:
```json
{
  "title": "New Task",
  "description": "Description of the task",
  "priority": "HIGH",
  "dueDate": "2024-12-31T23:59:59.000Z"
}
```
Response:
```json
{
  "_id": "task_id",
  "title": "New Task",
  "description": "Description of the task",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2024-12-31T23:59:59.000Z",
  "createdAt": "2024-12-07T12:00:00.000Z",
  "updatedAt": "2024-12-07T12:00:00.000Z"
}
```

#### 2. Get All Tasks
**GET /tasks**

Supports query parameters:
- `status` (e.g., `TODO`, `IN_PROGRESS`, `COMPLETED`)
- `priority` (e.g., `LOW`, `MEDIUM`, `HIGH`)
- `sort` (e.g., `createdAt`, `dueDate`, ascending/descending)
- Pagination: `limit` and `skip`

Example:
```http
GET /tasks?status=TODO&priority=HIGH&sort=createdAt&limit=10&skip=0
```
Response:
```json
[
  {
    "_id": "task_id",
    "title": "New Task",
    "description": "Description of the task",
    "status": "TODO",
    "priority": "HIGH",
    "dueDate": "2024-12-31T23:59:59.000Z",
    "createdAt": "2024-12-07T12:00:00.000Z",
    "updatedAt": "2024-12-07T12:00:00.000Z"
  }
]
```

#### 3. Get a Specific Task
**GET /tasks/:id**

Response:
```json
{
  "_id": "task_id",
  "title": "New Task",
  "description": "Description of the task",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2024-12-31T23:59:59.000Z",
  "createdAt": "2024-12-07T12:00:00.000Z",
  "updatedAt": "2024-12-07T12:00:00.000Z"
}
```

#### 4. Update a Task
**PUT /tasks/:id**

Request:
```json
{
  "status": "IN_PROGRESS"
}
```
Response:
```json
{
  "_id": "task_id",
  "title": "New Task",
  "description": "Description of the task",
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "dueDate": "2024-12-31T23:59:59.000Z",
  "createdAt": "2024-12-07T12:00:00.000Z",
  "updatedAt": "2024-12-07T12:30:00.000Z"
}
```

#### 5. Delete a Task
**DELETE /tasks/:id**

Response:
```json
{
  "message": "Task deleted successfully."
}
```
---

## Additional Requirements

###- Using authentication using JWT (JSON Web Token).

#### . Login
**POST /**

Request:
```json
{
  "username": "<your_username>",
  "password": "<your_password>"
}
```
Response:
```json
{
  "username": "<username>",
  "isAdmin": true,
  "accessToken": "<your_jwt_token>"
}
```
**DELETE /:userId** (Requires admin authentication)

Response:
```json
{
  "message": "User deleted successfully."
}
```


## Testing the API

### Using Postman
1. Import the Postman collection provided in the project.
2. For protected routes, include the `Authorization` header:
   ```
   Authorization: Bearer <your_jwt_token>
   ```


## Project Structure
```
.
├── main.js
├── controllers
│   └── taskController.js
├── routes
│   └── taskRouters.js
├── middleware
│   └── errorHandler.js
├── models
│   └── Task.js
├── .env
├── package.json
└── README.md
```

---


