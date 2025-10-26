📝 Basic Task Manager

A simple full-stack Task Management application built with ASP.NET Core (C#) for the backend and React + Vite (TypeScript) for the frontend.

🚀 Features

➕ Add new tasks

✅ Mark tasks as completed

❌ Delete tasks

📋 View all tasks in a clean UI

🌐 RESTful API using ASP.NET Core

🔄 Real-time updates using API fetch calls

🧩 Tech Stack

Frontend:

React (Vite + TypeScript)

Axios for API communication

Tailwind CSS for styling (optional)

Backend:

ASP.NET Core 8.0 Web API

C# with MVC architecture

JSON-based REST endpoints

CORS enabled for frontend communication

📁 Project Structure

BasicTaskManager/            # Backend (ASP.NET Core)
│   ├── Controllers/
│   │   └── TaskController.cs
│   ├── Models/
│   │   └── TaskItem.cs
│   ├── Program.cs
│   └── BasicTaskManager.csproj
│
└── Frontend/                    # Frontend (React + Vite)
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── App.tsx
    ├── package.json
    └── vite.config.ts

⚙️ Running the Project Locally
🧠 Prerequisites

Make sure you have the following installed:

.NET 8 SDK

Node.js (LTS)

npm or yarn package manager

🖥️ Backend (ASP.NET Core)

Open a terminal in the BasicTaskManager/ folder

Run:

dotnet restore
dotnet run


The API will start on:

http://localhost:5000

💻 Frontend (React + Vite)

Open another terminal in the Frontend/ folder

Run:

npm install
npm run dev


The app will be available at:

http://localhost:5173

🔗 Connecting Frontend and Backend

Make sure your frontend’s API base URL (in Axios or fetch) matches your backend URL, for example:

const API_URL = "http://localhost:5000/api/tasks";

🧪 API Endpoints
Method Endpoint Description
GET	/api/tasks Get all tasks
POST /api/tasks Add a new task
PUT	/api/tasks/{id} Update a task status
DELETE /api/tasks/{id} Delete a task

Examples on how to call api through cmd
Get : curl -X GET http://localhost:5000/api/tasks
Post : curl -X POST http://localhost:5000/api/tasks -H "Content-Type: application/json" -d "{\"description\":\"Learn ASP.NET\",\"isCompleted\":false}"
Put : curl -X PUT http://localhost:5000/api/tasks/<TASK_ID> -H "Content-Type: application/json" -d "{\"description\":\"Learn ASP.NET Core\",\"isCompleted\":true}"
Delete : curl -X DELETE http://localhost:5000/api/tasks/<TASK_ID>ex