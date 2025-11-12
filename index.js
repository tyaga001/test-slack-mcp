const express = require("express");
const app = express();
app.use(express.json()); // for parsing application/json

// --------------------------
//  API VERSION 1
// --------------------------
const v1 = express.Router();

// Fake database (for demo)
let users = [
  { id: 1, name: "David" },
  { id: 2, name: "Sarah" }
];

// GET: Fetch users
v1.get("/users", (req, res) => {
  res.json({
    version: "v1",
    data: users
  });
});

// POST: Add a new user
v1.post("/users", (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Name is required" });

  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  res.status(201).json({
    version: "v1",
    message: "User created",
    data: newUser
  });
});

// DELETE: Remove a user by ID
v1.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter((user) => user.id !== id);

  res.json({
    version: "v1",
    message: `User with ID ${id} deleted`,
  });
});

// Register versioned routes
app.use("/api/v1", v1);
