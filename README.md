# School Management System

A full-stack school management system built with React, Vite, Express, and MongoDB. The project currently focuses on authentication, school onboarding, super admin approval flows, and school admin student management.

## Overview

This repository is split into two apps:

- `frontend/client` for the React UI
- `backend` for the Express API and MongoDB models

The current flow is:

1. A school registers through the signup form.
2. The backend creates a `School` record with `PENDING` status and a linked `SCHOOL_ADMIN` user.
3. A super admin reviews pending schools and approves or rejects them.
4. Approved school admins can log in and manage students.

## Current Features

### Authentication and access control

- School admin signup with school creation
- Role-aware login for:
  - `SUPER_ADMIN`
  - `SCHOOL_ADMIN`
- JWT-based authentication
- Protected `/api/auth/user` endpoint for restoring the logged-in session
- Middleware-based route protection for dashboard APIs
- School admins are blocked from logging in until their school is approved

### Super admin features

- View pending school registration requests
- Approve schools by changing status to `ACTIVE`
- Reject schools by changing status to `SUSPENDED`
- Dashboard shell for:
  - Pending admins
  - Remove users
  - Reports

Note: only the pending schools flow is currently connected to the backend. The other super admin tabs are present as UI placeholders.

### School admin features

- School admin dashboard
- Create/register a new student
- Validation for required student fields
- Duplicate roll number protection per school
- Students list backend endpoint scoped to the logged-in school
- UI sections for:
  - Student registration
  - Student list
  - Fee registration

Note: the student creation flow is implemented. The students list UI and fee registration UI are still partial/in progress.

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Tailwind CSS v4
- TanStack React Query
- Axios
- ESLint

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- JWT (`jsonwebtoken`)
- `bcryptjs`
- `cors`
- `dotenv`
- `nodemon`

## Project Structure

```text
sms/
|-- backend/
|   |-- src/
|   |   |-- controllers/
|   |   |-- middlewares/
|   |   |-- models/
|   |   |-- routes/
|   |   |-- app.js
|   |   `-- server.js
|   `-- package.json
|-- frontend/
|   `-- client/
|       |-- src/
|       |   |-- api/
|       |   |-- components/
|       |   |-- layouts/
|       |   |-- pages/
|       |   |-- store/
|       |   |-- App.jsx
|       |   `-- main.jsx
|       `-- package.json
`-- README.md
```

## Data Models

### User

- `schoolId`
- `name`
- `email`
- `passwordHash`
- `role`
- `isActive`
- `lastLoginAt`

Supported roles in the schema:

- `SUPER_ADMIN`
- `SCHOOL_ADMIN`
- `ACCOUNTANT`
- `TEACHER`

### School

- `name`
- `ownerEmail`
- `phone`
- `address`
- `logoUrl`
- `status`
- `planKey`
- `subscription`
- `allowedIps`
- `stats`

School status values:

- `PENDING`
- `ACTIVE`
- `SUSPENDED`

### Student

- `schoolId`
- `studentName`
- `fatherName`
- `rollNumber`
- `className`
- `section`
- `monthlyFee`
- `phone`
- `address`
- `admissionDate`
- `dob`
- `gender`

The student collection has a unique compound index on `schoolId + rollNumber`.

## API Summary

### Auth routes

- `POST /api/auth/signup`
  - Creates a pending school and linked school admin
- `POST /api/auth/login`
  - Returns role flags and a JWT token
- `GET /api/auth/user`
  - Protected route that returns the authenticated user
- `GET /api/auth/ping`
  - Health-style auth route check

### School routes

- `GET /api/schools/pendingschools`
  - Fetches schools waiting for approval
- `PUT /api/schools/:id/status`
  - Updates school status to `PENDING`, `ACTIVE`, or `SUSPENDED`

### Admin dashboard routes

- `POST /api/admindashboard/createnewstudent`
  - Protected route for creating a student under the logged-in school
- `GET /api/admindashboard/studentsList`
  - Protected route for fetching school-specific students

## Frontend Routes

- `/`
- `/login`
- `/signup`
- `/superadmindashboard`
- `/admindashboard`

The frontend uses lazy-loaded pages and keeps auth state in local storage through a custom auth context.

## Local Development Setup

### Prerequisites

- Node.js 18+ recommended
- npm
- MongoDB connection string

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Install frontend dependencies

```bash
cd frontend/client
npm install
```

### 3. Create backend environment variables

Create a `.env` file inside `backend/` with:

```env
PORT=5000
MONGO_DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Start the backend

```bash
cd backend
npm run dev
```

### 5. Start the frontend

```bash
cd frontend/client
npm run dev
```

The frontend expects the backend to run at `http://localhost:5000`.

## What Is Implemented vs In Progress

Implemented:

- school signup
- school admin login
- super admin login flow support
- JWT auth middleware
- pending school approval flow
- student registration API and form

In progress or placeholder:

- students list frontend data integration
- fee registration backend logic
- pending admins management
- remove users management
- reports module
- production-ready deployment setup

## Known Notes

- The project currently uses hardcoded API base URLs pointing to `http://localhost:5000`.
- There is no root workspace script yet; frontend and backend are started separately.
- Some dashboard sections are UI-only and still need backend integration.
- There is no seed script or default super admin bootstrap documented in the code yet.

## Possible Next Improvements

- Add an `.env.example` file
- Move API base URLs to environment variables
- Add a proper students list query on the frontend
- Build fee collection and payment history modules
- Add tests for auth and student creation flows
- Add a script to create the first super admin account
- Improve validation and error handling consistency

## Authoring Note

This README reflects the repository's current implementation state, including partially built modules, instead of describing planned features as complete.
