# DSM - School Management System

## Login Credentials

### Default Admin Account
- **Username**: `admin`
- **Password**: `admin123`

## How to Use

1. **Start the Application**
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5174/`

2. **Login as Admin**
   - Use the credentials above to login
   - You'll be redirected to the Admin Dashboard

3. **Create New Users**
   - Navigate to "User Management" from the sidebar
   - Click "Create New User"
   - Fill in the form (username, role, name, email)
   - The system will generate:
     - A unique User ID (e.g., TEA001, STU002, PAR003)
     - A temporary password
   - Copy both the User ID and temporary password

4. **User First Login**
   - New users login with their generated User ID as username
   - They must change their temporary password on first login
   - After password change, they're redirected to their role-based dashboard

## Features

- **JWT Authentication** (mocked for demo)
- **Role-based Access Control**
  - Admin: Full access to user management, all features
  - Teacher: Access to students, attendance, tasks
  - Student: Access to tasks, results, profile
  - Parent: Access to view children's information
- **Password Management**
  - Temporary passwords for new users
  - Forced password change on first login
- **User Management**
  - Create users with roles
  - Auto-generated User IDs and passwords
  - Delete users (except admin)

## System Roles

1. **Admin**
   - Create/manage users
   - Access all system features
   - View all data

2. **Teacher**
   - Manage students
   - Take attendance
   - Assign tasks
   - View results

3. **Student**
   - View tasks
   - Check results
   - Manage profile

4. **Parent**
   - View child's information
   - Check attendance/results

## Tech Stack

- React + TypeScript
- React Router v6
- Zustand (State Management)
- TailwindCSS
- Mock JWT Authentication
- Vite (Build Tool)
