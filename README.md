# TaskFlow - MERN Task Management Application

A secure, responsive, production-grade Task Management Application built using the MERN stack (MongoDB, Express, React, Node.js). 

TaskFlow allows users to create accounts, authenticate securely, and manage their daily workflows. It includes features like status toggling, task search, status/priority filtering, pagination, sorting, and responsive Light/Dark theme modes.

---

## Key Features

- **JWT Authentication**: Secure user registration and login with bcrypt password hashing.
- **RESTful APIs**: Clean backend endpoints structure supporting full CRUD operations.
- **Pagination, Search, and Filtering**: Responsive pagination, regex search matching title and description, and filters for task status (Pending/Completed) and priority (Low/Medium/High).
- **Bonus Capabilities**:
  - Task Priority (Low, Medium, High)
  - Due Dates with overdue indicators
  - Sorting (by date, priority, or due dates in descending/ascending orders)
  - Debounced Search (optimizes backend request counts)
  - Theme Selection (Light/Dark themes)
  - Skeleton Loaders (for page loads)
- **State Management**: Centralized Context API for auth/theme and TanStack Query (React Query) for API state and caching.

---

## Folder Structure

```text
TaskFlow/
│
├── backend/
│   ├── src/
│   │   ├── config/          # Database connection
│   │   ├── controllers/     # Auth and Tasks logic handlers
│   │   ├── middleware/      # JWT guards, error handlers, and validations check
│   │   ├── models/          # User and Task mongoose schemas
│   │   ├── routes/          # Express API route bindings
│   │   ├── utils/           # Response standardization helpers
│   │   ├── validations/     # Input validation rules (express-validator)
│   │   ├── app.js           # Express app setup and middleware configuration
│   │   └── server.js        # Server entrypoint
│   ├── .env.example         # Template for environment settings
│   └── package.json         # Backend node scripts and dependencies
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable UI elements (Navbar, Cards, Modals, Loaders)
    │   ├── context/         # React Context Providers (Auth, Theme)
    │   ├── hooks/           # Custom React hooks (useTasks, useDebounce)
    │   ├── pages/           # Pages layouts (Login, Register, Dashboard)
    │   ├── services/        # Axios API client setup and interceptors
    │   ├── App.jsx          # App root routing configuration
    │   ├── index.css        # Main stylesheet (Tailwind v4)
    │   └── main.jsx         # React DOM mount point
    ├── vite.config.js       # Vite configuration (Tailwind and backend proxy setup)
    └── package.json         # Frontend node scripts and dependencies
```

---

## Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local instance or MongoDB Atlas cluster connection string)

### 1. Backend Setup
1. Navigate into the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` variables (e.g. database connection string and secret token):
   ```text
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://127.0.0.1:27017/taskflow
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRE=30d
   ```
5. Run the server in development mode:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Navigate into the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the web app in your browser at `http://localhost:3000`.

---

## API Documentation

All request bodies and responses are formatted as JSON. Protected endpoints require a valid JWT passed in the header as: `Authorization: Bearer <token>`.

### Authentication Endpoints

#### Register a New User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body Parameters**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword123"
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJhbGciOi...",
      "user": {
        "id": "603d2b...",
        "name": "John Doe",
        "email": "johndoe@example.com"
      }
    }
  }
  ```

#### Authenticate User (Login)
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body Parameters**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "securepassword123"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJhbGciOi...",
      "user": {
        "id": "603d2b...",
        "name": "John Doe",
        "email": "johndoe@example.com"
      }
    }
  }
  ```

### Task Endpoints (Protected)

#### Retrieve All User Tasks
- **URL**: `/api/tasks`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Query Parameters (Optional)**:
  - `search`: Filter titles/descriptions by regex (e.g. `?search=report`)
  - `status`: Filter by status (`Pending` or `Completed`)
  - `priority`: Filter by priority (`Low`, `Medium`, `High`)
  - `page`: Page index (default: `1`)
  - `limit`: Records per page (default: `10`)
  - `sortBy`: Field to sort by (`createdAt`, `dueDate`, `title`, `priority`)
  - `sortOrder`: Sorting direction (`asc` or `desc`)
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "tasks": [
        {
          "_id": "603d2c...",
          "title": "Complete Slides",
          "description": "Prepare PDF decks",
          "status": "Pending",
          "priority": "High",
          "dueDate": "2026-06-15T00:00:00.000Z",
          "userId": "603d2b...",
          "createdAt": "2026-06-10T00:00:00.000Z",
          "updatedAt": "2026-06-10T00:00:00.000Z"
        }
      ],
      "totalPages": 1,
      "currentPage": 1,
      "totalRecords": 1
    }
  }
  ```

#### Retrieve Task by ID
- **URL**: `/api/tasks/:id`
- **Method**: `GET`
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": { ... }
  }
  ```

#### Create a Task
- **URL**: `/api/tasks`
- **Method**: `POST`
- **Body Parameters**:
  ```json
  {
    "title": "Build backend",
    "description": "Create REST controllers",
    "priority": "Medium",
    "dueDate": "2026-06-20T00:00:00.000Z"
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "data": { ... }
  }
  ```

#### Update a Task
- **URL**: `/api/tasks/:id`
- **Method**: `PUT`
- **Body Parameters (Optional)**: Title, description, status, priority, dueDate.
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": { ... }
  }
  ```

#### Toggle Task Status
- **URL**: `/api/tasks/:id/status`
- **Method**: `PATCH`
- **Body Parameters**:
  ```json
  {
    "status": "Completed"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": { ... }
  }
  ```

#### Delete a Task
- **URL**: `/api/tasks/:id`
- **Method**: `DELETE`
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "603d2c...",
      "message": "Task deleted successfully"
    }
  }
  ```

---

## Deployment Steps

### Backend Deployment (Render)
1. Commit the code to a Git repository (GitHub, GitLab, etc.).
2. Log in to [Render](https://render.com) and click **New > Web Service**.
3. Link your Git repository.
4. Set the following details:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add the variables:
   - `MONGO_URI`: (your MongoDB Atlas connection string)
   - `JWT_SECRET`: (a secure random string)
   - `NODE_ENV`: `production`
6. Click **Deploy Web Service**. Render will build and host your API.

### Database Deployment (MongoDB Atlas)
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Go to **Network Access** and whitelist IP addresses (use `0.0.0.0/0` for Render server or get Render's specific IP list).
3. Under **Database Access**, create a user with read/write access.
4. Click **Connect > Connect your application** to copy the MongoDB Connection String URI. Include it in the backend's production `MONGO_URI`.

### Frontend Deployment (Vercel)
1. Install the Vercel CLI locally or connect your Git account directly on the [Vercel Dashboard](https://vercel.com).
2. Click **Add New > Project** and link your Git repository.
3. Set the following configs:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Under **Environment Variables**, add the API reference link:
   - `VITE_API_URL`: (the live URL of your Render backend server, e.g. `https://taskflow-api.onrender.com`)
5. Click **Deploy**. Vercel will compile and host the frontend.
