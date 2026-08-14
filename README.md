# User Management Dashboard

A full-stack CRUD application for managing users with a modern React frontend and a PostgreSQL-powered Node.js backend.

## Overview

This project is a user management dashboard built for managing employees or contacts with standard CRUD operations:

- View all users
- Create a new user
- View user details
- Edit an existing user
- Delete a user with a custom confirmation modal

## Tech Stack

- Frontend: React, Vite, React Router, Axios, CSS
- Backend: Node.js, Express.js
- Database: PostgreSQL, Sequelize ORM
- Validation: client-side form validation + server-side validation

## Features

- Responsive dashboard layout
- User form validation for required fields and email format
- Detailed user profile view
- Edit and delete actions
- Custom in-app delete confirmation popup
- Centralized API error handling
- Automatic database table creation on startup

## Project Structure

```bash
user-mgmt-dashboard/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── userController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── validate.js
│   │   ├── models/
│   │   │   └── User.js
│   │   └── routes/
│   │       └── userRoutes.js
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── userApi.js
│   │   ├── components/
│   │   │   ├── DeleteConfirmModal.jsx
│   │   │   └── UserForm.jsx
│   │   ├── pages/
│   │   │   ├── CreateUser.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditUser.jsx
│   │   │   └── UserDetails.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── README.md
├── .gitignore
└── .env.example
```

## Prerequisites

Make sure you have:

- Node.js 18 or later
- npm
- PostgreSQL running locally
- A PostgreSQL database created for the app

## Database Setup

Create the database:

```sql
CREATE DATABASE user_mgmt_dashboard;
```

If your local PostgreSQL user is different from `postgres`, update the values in the backend `.env` file.

## Environment Variables

### Backend

Create a `.env` file in the `backend` folder:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=user_mgmt_dashboard
DB_USER=postgres
DB_PASSWORD=your_password
CLIENT_ORIGIN=http://localhost:5173
```

### Frontend

Create a `.env` file in the `frontend` folder:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Running the Project

### 1. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Start the backend

```bash
cd backend
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

### 3. Start the frontend

```bash
cd frontend
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

Open `http://localhost:5173` in your browser.

## API Reference

Base URL: `/api/users`

| Method | Endpoint  | Description             |
| ------ | --------- | ----------------------- |
| GET    | `/`       | Get all users           |
| GET    | `/:id`    | Get a single user by ID |
| POST   | `/`       | Create a new user       |
| PUT    | `/:id`    | Update a user           |
| DELETE | `/:id`    | Delete a user           |
| GET    | `/health` | Backend health check    |

### Example payload

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "555-0100",
  "company": "Acme Inc",
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "zipcode": "12345",
    "geo": {
      "lat": 37.7749,
      "lng": -122.4194
    }
  }
}
```

## Response Format

### Success

```json
{
  "success": true,
  "data": { ... }
}
```

### Error

```json
{
  "success": false,
  "message": "User not found"
}
```

or

```json
{
  "success": false,
  "errors": ["Email is required"]
}
```

## Notes

- The backend automatically creates the `users` table using `sequelize.sync()` on startup.
- The frontend uses a custom confirmation modal instead of the browser alert dialog.
- This project is suitable for local development and can be extended with search, pagination, authentication, and tests.

## Future Improvements

- Add search and filtering
- Add pagination for larger datasets
- Add authentication and authorization
- Add automated tests for backend and frontend
- Add sorting for user columns

## License

This project is for educational/demo use.
