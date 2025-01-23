const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs"); // Using EJS for HTML rendering

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/Chaitanya-app-1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Schema and Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
},
{ collection: 'student' }); 
const student = mongoose.model("student", UserSchema);

// Routes
// GET Route to send data to the frontend
app.get("/", async (req, res) => {
  try {
    const users = await student.find();
    res.render("index", { users }); // Pass users to the frontend
  } catch (error) {
    res.status(500).send("Error fetching users: " + error.message);
  }
});

// POST Route to receive form data
app.post("/add-user", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const newUser = new student({ name, email, age });
    await newUser.save();
    res.redirect("/"); // Redirect to homepage after saving
  } catch (error) {
    res.status(500).send("Error saving user: " + error.message);
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
