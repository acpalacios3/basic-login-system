import express from "express";
import User from "../models/User.js";

const router = express.Router();

// 2. Build the Registration Endpoint
// Create a POST route (e.g., /api/users/register).
// In this route, take the username, email, and password from the req.body.
// Check if a user with the given email already exists. If so, return a 400 status 
// with an appropriate message.

// If the user does not exist, create a new User document with the provided data. 
// The pre-save hook you wrote in Lesson 1 should automatically hash the password.
// Save the new user to the database.
// Respond with a 201 status and the newly created user object (excluding the password).


router.post("/api/users/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists." });
        }

        //new User(): creates a new document using our model
        //username, email, password: these are the data we receive from req.body.
        const newUser = new User({
            username,
            email,
            password
        });

        //save the document in MongoDB
        // When we run save(), the pre("save") middleware we created in User.js is automatically triggered.
        // There, bcrypt turns the password into a hash before saving it.
        await newUser.save();

        //Respond with a 201 status and the newly created user object (excluding the password
        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (err) {
        res.status(500).json({
            message: "Something went wrong: " + err.message
        });
    }
});

export default router;