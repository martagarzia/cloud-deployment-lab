/*
  This file is the main entry point of the application.
  It creates and configures the Express web server, defines the HTTP routes,
  and starts listening for incoming requests on the configured port.
  It also loads the SQLite database connection so that the application
  can interact with persistent data.
*/

// Import the Express framework so that we can use its tools to create a web server.
const express = require("express");

// Import the SQLite database connection.
const db = require("../data/database");

// Create an Express application.
const app = express();

// Enable Express to read JSON data sent in HTTP request bodies.
app.use(express.json());

// Define a health check endpoint for monitoring the application.
app.get("/health", (req, res) => {
  // Return a successful response when the application is running.
  res.status(200).json({ status: "ok" });
});

// Define the network port where our server will listen for incoming HTTP requests.
const PORT = 3000;

// Tell Express what to do when a client sends a GET request to the "/" route.
// "/" represents the root URL of our application, for example: http://localhost:3000/
app.get("/", (req, res) => {
  // Send a text response back to the client that made the request.
  res.send("Cloud Deployment Lab is running on Hetzner!");
});

// Define a GET endpoint to retrieve all tasks from the database.
app.get("/tasks", (req, res) => {
  // Read all tasks from the database.
  const tasks = db.prepare("SELECT * FROM tasks").all();

  // Return the tasks as a JSON response.
  res.json(tasks);
});

// Define a GET endpoint to retrieve one task using its ID.
app.get("/tasks/:id", (req, res) => {
  // Read the task ID from the URL.
  const id = req.params.id;

  // Find the task with the requested ID in the database.
  const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

  // Check whether the requested task exists.
  if (!task) {
    // Return a 404 error when the task does not exist.
    return res.status(404).json({ error: "Task not found" });
  }

  // Return the task as a JSON response.
  res.json(task);
});

// Define a POST endpoint to create a new task.
app.post("/tasks", (req, res) => {
  // Read the task title from the JSON request body.
  const title = req.body.title;

  // Check whether the task title was provided.
  if (!title) {
    // Return a 400 error when the title is missing.
    return res.status(400).json({ error: "Title is required" });
  }

  // Insert the new task into the database.
  const result = db.prepare("INSERT INTO tasks (title) VALUES (?)").run(title);

  // Create the response object containing the new task.
  const task = {
    // Return the database-generated task ID.
    id: result.lastInsertRowid,

    // Return the task title.
    title: title,

    // Return the default incomplete state.
    completed: 0
  };

  // Return the newly created task as a JSON response.
  res.json(task);
});

// Define a PUT endpoint to update an existing task.
app.put("/tasks/:id", (req, res) => {
  // Read the task ID from the URL.
  const id = req.params.id;

  // Read the new title from the JSON request body.
  const title = req.body.title;

  // Read the new completed value from the JSON request body.
  const completed = req.body.completed;

  // Check whether the task title was provided.
  if (!title) {
    // Return a 400 error when the title is missing.
    return res.status(400).json({ error: "Title is required" });
  }

  // Check whether the completed value was provided.
  if (completed === undefined) {
    // Return a 400 error when the completed value is missing.
    return res.status(400).json({ error: "Completed is required" });
  }

  // Check whether the requested task exists.
  const existingTask = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

  // Return a 404 error when the task does not exist.
  if (!existingTask) {
    // Send the error response to the client.
    return res.status(404).json({ error: "Task not found" });
  }

  // Update the task with the requested ID in the database.
  db.prepare("UPDATE tasks SET title = ?, completed = ? WHERE id = ?").run(
    title,
    completed,
    id
  );

  // Find the updated task in the database.
  const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

  // Return the updated task as a JSON response.
  res.json(task);
});

// Define a DELETE endpoint to remove an existing task.
app.delete("/tasks/:id", (req, res) => {
  // Read the task ID from the URL.
  const id = req.params.id;

  // Delete the task with the requested ID from the database.
  db.prepare("DELETE FROM tasks WHERE id = ?").run(id);

  // Return a confirmation message as a JSON response.
  res.json({ message: "Task deleted successfully" });
});

// Start the web server and make it listen for incoming HTTP requests on port 3000.
// The function inside listen() runs once the server has successfully started.
app.listen(PORT, () => {
  // Print a message in the terminal so we know that the server is running and where we can access it.
  console.log(`Server running on http://localhost:${PORT}`);
});