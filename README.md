🔐 AuthVault - JWT Authentication & Role Management API

A production-style backend authentication and authorization system built with Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, bcrypt, and HTTP-only Cookies.

This project demonstrates secure user authentication, role-based authorization, password hashing, protected routes, middleware usage, and admin-only operations.

---

## Features

### Authentication

- User Registration
- User Login
- Secure Password Hashing using bcrypt
- JWT Token Generation
- JWT Verification
- HTTP-only Cookie Storage
- Protected Profile Route
- User Logout

### Authorization

- Role-Based Access Control (RBAC)
- USER Role
- ADMIN Role
- Admin-Only Routes

### Admin Features

- Get All Registered Users
- Delete Users

---

## Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Authentication & Security

- JSON Web Token (JWT)
- bcrypt
- cookie-parser

### Environment Management

- dotenv

---

## Project Structure

auth-vault/
│
├── controllers/
│ ├── authController.js
│ └── adminController.js
│
├── middlewares/
│ ├── authMiddleware.js
│ └── roleMiddleware.js
│
├── models/
│ └── userModel.js
│
├── routes/
│ ├── authRoutes.js
│ └── adminRoutes.js
│
├── connection.js
├── index.js
├── .env
├── .gitignore
├── package.json
└── README.md

---

## Installation

### Clone Repository

```
git clone <repository-url>
cd auth-vault
```

### Install Dependencies

```
npm install
```

### Install Development Dependency

```
npm install --save-dev nodemon
```

---

## Environment Variables

Create a .env file in the root directory.

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Run Project

### Production

```
node index.js
```

### Development

```
npm run dev
```

Example script in package.json:

```
"scripts": {
"start": "node index.js",
"dev": "nodemon index.js"
}
```

---

## Database Schema

### User

```
{
name: String,
email: String,
password: String,
role: String
}
```

### Example User Document

```
{
"_id": "123456",
"name": "Vinay",
"email": "vinay@gmail.com",
"password": "$2b$10$hashedpassword...",
"role": "USER"
}
```

---

## Authentication Flow

User Login
↓
Credentials Verified
↓
JWT Generated
↓
Cookie Created
↓
Browser Stores Cookie
↓
Cookie Sent With Requests
↓
JWT Verified
↓
Access Granted

---

## Authorization Flow

Request
↓
Authentication Middleware
↓
JWT Verified
↓
Role Middleware
↓
Role Checked
↓
Allow / Reject

---

## API Endpoints

### Authentication Routes

#### Register User

POST /auth/register

Request Body:

```
{
"name": "Vinay",
"email": "vinay@gmail.com",
"password": "123456"
}
```

---

#### Login User

POST /auth/login

Request Body:

```
{
"email": "vinay@gmail.com",
"password": "123456"
}
```

---

#### Get Profile

GET /auth/profile

Protected Route

Requires valid JWT cookie.

---

#### Logout User

POST /auth/logout

Clears authentication cookie.

---

### Admin Routes

#### Get All Users

GET /admin/users

Admin Only

---

#### Delete User

DELETE /admin/user/:id

Admin Only

Example:

DELETE /admin/user/123456789

---

## Concepts Learned

This project covers:

- Express Routing
- Controllers
- Middleware
- MongoDB Atlas
- Mongoose Models
- Environment Variables
- Password Hashing
- Authentication
- Authorization
- JWT
- Cookies
- Protected Routes
- Role-Based Access Control
- CRUD Operations
- Error Handling

---

## Security Practices Implemented

- Password Hashing with bcrypt
- JWT Authentication
- HTTP-only Cookies
- Protected Routes
- Role-Based Authorization
- Environment Variables for Secrets
- Password Never Returned in API Responses

---

## Learning Outcomes

After completing this project, I can explain:

1. Authentication vs Authorization
2. JWT Authentication Flow
3. Password Hashing using bcrypt
4. HTTP-only Cookies
5. Middleware in Express
6. MongoDB & Mongoose Integration
7. Protected Routes
8. Role-Based Access Control (RBAC)
9. CRUD Operations with MongoDB
10. Secure Backend Development Fundamentals

---

## Future Improvements

- Refresh Tokens
- Email Verification
- Password Reset Functionality
- Account Locking After Multiple Failed Attempts
- Rate Limiting
- Input Validation using express-validator
- API Documentation using Swagger
- Docker Support
- Unit & Integration Testing

---

## Author

Vinay Kumar

Backend Learning Project built while mastering:

- Node.js
- Express.js
- MongoDB
- Authentication
- Authorization
- Backend Development
