import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken"; //Used for login, not for user registration

const router = express.Router();

// we retrieve the environment variable key to use it when the token is generated
// setup our JWT Token secret & expiration time
const secret = process.env.JWT_SECRET;
const expiration = "2h";



//====================================================================================
// 2. Build the Registration Endpoint
// Create a POST route (e.g., /api/users/register).
// In this route, take the username, email, and password from the req.body.
// Check if a user with the given email already exists. If so, return a 400 status 
// with an appropriate message.

// If the user does not exist, create a new User document with the provided data. 
// The pre-save hook you wrote in Lesson 1 should automatically hash the password.
// Save the new user to the database.
// Respond with a 201 status and the newly created user object (excluding the password).
//=====================================================================================

// =============================================================================
// a) Register user and bcrypt turns the password into a hash before saving it
// =============================================================================


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

//===================================================================================================================================================================
// 3. Build the Login Endpoint
// Create a POST route (e.g., /api/users/login).
// In this route, take the email and password from the req.body.
// Find a user in the database with the matching email. If no user is found, return a 400 status with a generic error message (e.g., “Incorrect email or password.”).
// If a user is found, use the isCorrectPassword instance method (or bcrypt.compare) to compare the incoming password with the user’s stored hashed password.
// If the passwords do not match, return a 400 status with the same generic error message.

// If the passwords match, create a JWT for the user using the jsonwebtoken library. The payload should contain non-sensitive user data like their _id and username.
// Respond with a JSON object containing the signed token and the user’s data.
//============================================================================================================================================================

router.post("/api/users/login", async (req, res) => {
    try {

        // ==============================
        //  b) Validate credentials
        // ==============================

        if (!req.body.email || !req.body.password) {
            throw new Error("Incomplete Data from request.");
        }
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        const correctPw = await user.isCorrectPassword(req.body.password);

        if (!correctPw) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }


        // ===========================
        // c)  Generate the token
        // ===========================


        // The payload should contain non-sensitive user data
        const payload = {
            _id: user._id,
            username: user.username,
            email: user.email,
        };

        // jwt.sign is what we use to CREATE / SIGN the token for the user!
        // Payload: the user's information
        // secret: our secret key stored in .env
        // options: the token options, like its expiration time
        const token = jwt.sign({ data: payload }, secret, {
            expiresIn: expiration,
        });


        // ======================================================
        // d) return the token and the user's data to the client
        // ======================================================

        //  res.json(): sends a JSON response
        // token: returns the generated JWT
        // user: payload: returns the user data
        res.json({ token, user: payload });


    } catch (err) {
        res.status(500).json({
            message: "Something went wrong: " + err.message
        });
    }
});

export default router;



