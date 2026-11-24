# Basic Login System

## Description
This project is a Basic Login System built with Node.js, Express, MongoDB, and Mongoose. It provides user registration and login functionality using password hashing and JSON Web Tokens (JWT) for authentication.

## Technologies Used
- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web framework for creating API endpoints.
- **MongoDB:** NoSQL database for storing user information.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
- **Bcrypt:** Library used to hash and compare passwords.
- **JSON Web Token (JWT):** Used to generate authentication tokens.
- **JSON Web Token (jsonwebtoken):** Library imported using import jwt from "jsonwebtoken"; to create and sign JWT authentication tokens after a successful login.
- **Dotenv:** Used to manage environment variables.

## Features

### 1. User Registration
- Registers new users with a username, email, and password.
- Checks whether an email already exists.
- Hashes passwords using Bcrypt before saving them to MongoDB.
- Returns the registered user's information without exposing the password.

### 2. User Login
- Finds users by email.
- Verifies passwords using Bcrypt.
- Returns an error if the email or password is incorrect.
- Generates a JWT authentication token after successful login.
- Returns the token and user information.

## API Endpoints

POST: `/api/users/register` ,Registers a new user
POST: `/api/users/login` , Authenticates an existing user 

## Installation and Setup

* Install dependencies:
npm install

*Create a `.env` file in the root directory and configure the following environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

* Start the server:
```bash
node server.js
```
The server will connect to MongoDB and run on port 3000.

## Testing
The API endpoints can be tested using Postman by sending POST requests with JSON data in the request body.

## Security
- Passwords are hashed before being stored in the database.
- Passwords are never returned in API responses.
- JWT tokens are signed using a secret key stored in environment variables.
- The `.env` file is excluded from Git using `.gitignore`.

