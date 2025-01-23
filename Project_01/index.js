const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/Chaitanya-app-1")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Mongoose Schema and Model
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ROUTE to get all users from MOCK_DATA.json
app.get("/api/users", (req, res) => {
  try {
    const users = require("./MOCK_DATA.json"); // Load the data fresh for each request
    return res.json(users);
  } catch (err) {
    console.error("Error reading MOCK_DATA.json:", err);
    return res.status(500).json({ status: "error", message: "Failed to load users." });
  }
});

// ROUTE to display user names in an HTML list
app.get("/users", (req, res) => {
  try {
    const users = require("./MOCK_DATA.json"); // Import the JSON file
    const html = `
      <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
      </ul>
    `;

    return res.send(html); // Send the generated HTML as the response
  } catch (err) {
    console.error("Error generating HTML:", err);
    return res.status(500).send("Failed to load user data."); // Handle errors
  }
});


// PATCH ROUTE
app.patch("/api/users", (req, res) => {
  return res.json({ status: "pending" });
});

// DELETE ROUTE
app.delete("/api/users", (req, res) => {
  return res.json({ status: "pending" });
});

//POST ROUTE to add a new user to MOCK_DATA.json
// app.post("/api/users", (req, res) => {
//   const body = req.body;
//   try {
//     let users = require("./MOCK_DATA.json");
//     users.push({ ...body, id: users.length + 1 });
//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
//       if (err) {
//         console.error("Error writing to file:", err);
//         return res.status(500).json({ status: "error", message: "Failed to save user data." });
//       }
//       return res.json({ status: "success", id: users.length });
//     });
//   } catch (err) {
//     console.error("Error processing POST request:", err);
//     return res.status(500).json({ status: "error", message: "Failed to add user." });
//   }
// });
app.post("/api/users", async (req, res) => {
  const body = req.body;

  // Validate required fields
  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender ||
    !body.jobTitle
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Create a new user in the database
    const result = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      gender: body.gender,
      jobTitle: body.jobTitle,
    });

    console.log("User created:", result);
    return res.status(201).json({ msg: "User created successfully", result });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ msg: "Failed to create user" });
  }
});

// // Start the server
app.listen(PORT, () => console.log(`SERVER STARTED: ${PORT}`));
