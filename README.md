# Student Task Manager

A full-stack MERN application that helps students organise academic tasks, manage deadlines, and track their study progress.

## Problem Statement

Students often find it difficult to organise academic tasks, remember deadlines, and monitor their progress. This application provides a simple platform to manage study tasks efficiently.

## Features

- Create study tasks with a title, subject, and optional due date.
- View all tasks.
- Mark tasks as completed or pending.
- Delete tasks.
- View total, pending, and completed task counts.
- Store tasks in MongoDB.

## Technologies Used

- **MongoDB** – Database
- **Express.js** – Backend API
- **React.js** – Frontend
- **Node.js** – JavaScript runtime

## Project Structure

```text
student-task-manager/
├── client/
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md
```

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check server status |
| GET | `/api/tasks` | Retrieve all tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update task completion |
| DELETE | `/api/tasks/:id` | Delete a task |

## Run Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd student-task-manager
```

### 2. Start the backend

```bash
cd server
npm install
```

Configure your `.env` file with your MongoDB Atlas connection string:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

### 3. Start the frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser.

## Future Improvements

- User registration and login
- Separate tasks for each user
- Task editing and filtering
- Deadline reminders
- Online deployment
