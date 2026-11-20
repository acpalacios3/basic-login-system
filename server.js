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

// Windows code snippet so we can connect to MongoDB...
import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// setup our JWT Token secret & expiration time
const secret = process.env.JWT_SECRET;

// Define our App
const app = express();

app.use(express.json());

// and the PORT we will use to connect to it
const PORT = process.env.PORT || 3000;


// and connect to our database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log("Not connected to Database");
    console.error(error);
  });

// Welcome Base route
app.get("/", (req, res) => {
  res.send("Welcome to our Authentication API!");
});

app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
});