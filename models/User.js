import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"

// Schema	defines what the data will be like.
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,   // unique creates a uniqueness constraint through an index in MongoDB
    match: [/.+@.+\..+/, "Must match an email address!"],  //match: uses a regular expression to check that it has a valid format
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});


// Set up pre-save middleware to create password
// Before we do an action on the database
// of type "save" (or adding things to the DB)
// run this code first.
userSchema.pre("save", async function (next) {
  console.log("Initial Password: " + this.password)
  // If this is a New Document...
  // or we have Modified the Password...
  if (this.isNew || this.isModified("password")) {
    // lets make some salt rounds
    const saltRounds = 10;
    // and then encrpyt the password before storing it.
    // This changes the .password field in the actual Document before submitting it.
    this.password = await bcrypt.hash(this.password, saltRounds);
    console.log("Hashed Password: " + this.password)
  }
});

// Compare the incoming password with the hashed password
// password: password provided by the user when logging in
// this.password: password stored as a hash
// bcrypt.compare(): compares the received password with the hash
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


// model	Allows working with that data in MongoDB
const User = model("User", userSchema);

export default User;