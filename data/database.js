/*
  This file is responsible for creating and opening the SQLite database.
  It uses the better-sqlite3 library to establish the database connection
  and provides the database instance that can be used by the application
  to store, retrieve, update, and delete persistent data.
*/

// Import the better-sqlite3 library to work with SQLite databases.
const Database = require("better-sqlite3");

// Create or open the SQLite database file inside the data directory.
const db = new Database("data/database.sqlite");

// Create the tasks table if it does not already exist.
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
  )
`);

// Export the database connection so that other files can use it.
module.exports = db;