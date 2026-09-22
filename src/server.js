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

// Define the network port where our server will listen for incoming HTTP requests.
const PORT = 3000;

// Tell Express what to do when a client sends a GET request to the "/" route.
// "/" represents the root URL of our application, for example: http://localhost:3000/
app.get("/", (req, res) => {
  // Send a text response back to the client that made the request.
  res.send("Cloud Deployment Lab is running!");
});

// Start the web server and make it listen for incoming requests on port 3000.
// The function inside listen() runs once the server has successfully started.
app.listen(PORT, () => {
  // Print a message in the terminal so we know that the server is running and where we can access it.
  console.log(`Server running on http://localhost:${PORT}`);
});