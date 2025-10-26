# 📝 Basic Task Manager

**Live Website:** [http://4.240.103.147/](http://4.240.103.147/)

A simple full-stack Task Management application built with **ASP.NET Core (C#)** for the backend and **React + Vite (TypeScript)** for the frontend.

---

## 🚀 Features

- ➕ Add new tasks
- ✅ Mark tasks as completed
- ❌ Delete tasks
- 📋 View all tasks in a clean UI
- 🌐 RESTful API using ASP.NET Core
- 🔄 Real-time updates via API calls

---

## 🧩 Tech Stack

**Frontend:**

- React (Vite + TypeScript)
- Axios for API communication
- Tailwind CSS for styling

**Backend:**

- ASP.NET Core 8.0 Web API
- C# with MVC architecture
- JSON-based REST endpoints
- CORS enabled for frontend communication

---

## ⚙️ Running the Project Locally

### 🧠 Prerequisites

Make sure you have installed:

- .NET 8 SDK
- Node.js (LTS)
- npm or yarn

### 🖥️ Backend (ASP.NET Core)

1. Open a terminal in the `BasicTaskManager/` folder  
2. Run:

```bash
dotnet restore
dotnet run
The API will start on:
http://localhost:5000

💻 Frontend (React + Vite)
Open another terminal in the Frontend/ folder

Run:

bash
Copy code
npm install
npm run dev
The app will be available at:
http://localhost:5173

🔗 Connecting Frontend and Backend
Make sure your frontend’s API base URL matches your backend, for example in src/api.ts:

ts
Copy code
const API_URL = "http://localhost:5000/api/tasks";
For live deployment:

ts
Copy code
const API_URL = "http://4.240.103.147/api/tasks";
🧪 API Endpoints
Method	Endpoint Description
GET	/api/tasks	Get all tasks
POST	/api/tasks	Add a new task
PUT	/api/tasks/{id}	Update a task
DELETE	/api/tasks/{id}	Delete a task

⚡ Example API Calls (cURL)
Get all tasks

bash
Copy code
curl -X GET http://localhost:5000/api/tasks
Add a new task

bash
Copy code
curl -X POST http://localhost:5000/api/tasks \
-H "Content-Type: application/json" \
-d '{"description":"Learn ASP.NET","isCompleted":false}'
Update a task

bash
Copy code
curl -X PUT http://localhost:5000/api/tasks/<TASK_ID> \
-H "Content-Type: application/json" \
-d '{"description":"Learn ASP.NET Core","isCompleted":true}'
Delete a task

bash
Copy code
curl -X DELETE http://localhost:5000/api/tasks/<TASK_ID>
🌐 Live Website
Check the live deployment here: http://4.240.103.147/