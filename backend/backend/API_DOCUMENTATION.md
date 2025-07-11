# DSM School Management System - API Documentation

## Base URL
- **Development**: `http://localhost:5001/api`
- **Production**: Update accordingly

## Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Default Admin Credentials
- **Username**: `admin`
- **Password**: `admin123`
- **User ID**: `ADMIN001`

## API Endpoints

### 1. Authentication

#### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
```json
{
  "username": "admin",
  "password": "admin123"
}
```
- **Response**:
```json
{
  "user": {
    "id": "ADMIN001",
    "username": "admin",
    "role": "admin",
    "email": "admin@dsm.com",
    "firstName": "System",
    "lastName": "Administrator",
    "isTemporaryPassword": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "lastLogin": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "needsPasswordChange": false
}
```

#### Change Password
- **URL**: `/auth/change-password`
- **Method**: `PATCH`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "currentPassword": "current_password",
  "newPassword": "new_password"
}
```

### 2. User Management (Admin Only)

#### Create User
- **URL**: `/auth/create-user`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <admin_token>`
- **Body**:
```json
{
  "username": "john.doe",
  "role": "student",
  "email": "john@school.com",
  "firstName": "John",
  "lastName": "Doe"
}
```
- **Valid Roles**: `admin`, `teacher`, `student`, `parent`
- **Response**:
```json
{
  "message": "User created successfully",
  "user": {
    "id": "STU1234",
    "username": "john.doe",
    "role": "student",
    "email": "john@school.com",
    "firstName": "John",
    "lastName": "Doe",
    "isTemporaryPassword": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "temporaryPassword": "Abc123Xyz"
}
```

#### Get All Users
- **URL**: `/auth/users`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <admin_token>`
- **Response**: Array of user objects

#### Delete User
- **URL**: `/auth/users/:userId`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <admin_token>`
- **Response**:
```json
{
  "message": "User deleted successfully"
}
```

## User ID Generation
- **Admin**: `ADM + 4-digit number` (e.g., `ADM1001`)
- **Teacher**: `TEA + 4-digit number` (e.g., `TEA1001`)
- **Student**: `STU + 4-digit number` (e.g., `STU1001`)
- **Parent**: `PAR + 4-digit number` (e.g., `PAR1001`)

## Error Handling
The API returns appropriate HTTP status codes and error messages:

- **400**: Bad Request (validation errors)
- **401**: Unauthorized (invalid token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found
- **409**: Conflict (duplicate username/userId)
- **500**: Internal Server Error

## Frontend Integration
**Important**: Update your frontend to connect to port `5001` instead of `5000`:
```typescript
// authService.ts
const API_BASE_URL = 'http://localhost:5001/api';
```
