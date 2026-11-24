//1. Project Setup 
// Create a new project directory and initialize it with npm.
// Install the necessary packages: express, mongoose, bcrypt, jsonwebtoken, and dotenv.
// Set up your server.js file, an Express router for your user-related endpoints, 
// and a User model based on the schema from Lesson 1.
// Establish a connection to your MongoDB database. Use a .env file 
// to store your MONGO_URI, a JWT_SECRET, and a PORT.


//Configure our .env file
import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import jwt from "jsonwebtoken";
import userRoutes from "./routes/userRoutes.js"


// setup our JWT Token secret & expiration time
const secret = process.env.JWT_SECRET;

// Create our App Express
const app = express();

// It’s a middleware that allows Express to read JSON data coming in the body of an HTTP request.
app.use(express.json());
app.use(userRoutes);

// and the PORT we will use to connect to it
const PORT = process.env.PORT || 3000;

// Welcome Base route
app.get("/", (req, res) => {
  res.send("Welcome to our Authentication API!");
});

// Connect to MongoDB database
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB!");
    
    // Start the server and make it listen for requests on the indicated port
    app.listen(PORT, () => {
      console.log("Server running at http://localhost:" + PORT);
    });


  } catch (error) {
    console.log("Not connected to Database");
    console.error(error);
  }
}

connectDB();

