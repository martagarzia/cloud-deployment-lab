# Deployment Guide

## 1. Prerequisites

Install the following tools before starting:

- Git
- Node.js
- npm
- A GitHub account

Verify the installations:

`git --version`
`node --version`
`npm --version`

## 2. Clone the repository

Clone the GitHub repository to your local machine:

`git clone <repository-url>`

Move into the project directory:

`cd cloud-deployment-lab`

## 3. Initialize the Node.js project

Initialize a new Node.js project:

`npm init -y`

This creates the `package.json` file, which contains the project's metadata and dependencies.

## 4. Install Express

Install Express as a project dependency:

`npm install express`

This creates:

- `node_modules/` — installed project dependencies
- `package-lock.json` — records the exact dependency versions
- An updated `package.json` containing Express as a dependency

## 5. Verify the project structure

At this point, the project should contain:

`cloud-deployment-lab/`
`├── node_modules/`
`├── .gitignore`
`├── LICENSE`
`├── package.json`
`├── package-lock.json`
`└── README.md`

## 6. Create the application entry point

Create the `src/` directory:

`mkdir src`

Create the `src/server.js` file.

The file contains the Express application and starts the HTTP server on port `3000`.

The application responds to requests to the root route `/` with:

`Cloud Deployment Lab is running!`

## 7. Configure the start script

Update the `scripts` section in `package.json`:

`"start": "node src/server.js"`

This defines the command used to start the application.

When running `npm start`, npm executes `node src/server.js`.

## 8. Start the application

Start the application with:

`npm start`

The expected output is:

`Server running on http://localhost:3000`

Open `http://localhost:3000` in a web browser.

The expected response is:

`Cloud Deployment Lab is running!`

This verifies that Node.js and Express are correctly installed and that the application can receive and respond to HTTP requests.

At this point, the project should contain:

`cloud-deployment-lab/`
`├── node_modules/`
`├── src/`
`│   └── server.js`
`├── .gitignore`
`├── LICENSE`
`├── package.json`
`├── package-lock.json`
`└── README.md`

## 9. Install SQLite support

Install `better-sqlite3` as a project dependency:

`npm install better-sqlite3`

This allows the Node.js application to create and interact with a SQLite database.

The installation also updates `package.json` and `package-lock.json`.

## 10. Create the database directory

Create a `data/` directory in the project root.

This directory will contain the SQLite database and the code responsible for opening the database connection.

At this point, the project should contain:

`cloud-deployment-lab/`
`├── data/`
`├── node_modules/`
`├── src/`
`│   └── server.js`
`├── .gitignore`
`├── LICENSE`
`├── package.json`
`├── package-lock.json`
`└── README.md`

## 11. Create the SQLite database connection

Create the `data/database.js` file.

The file uses `better-sqlite3` to create or open the SQLite database at:

`data/database.sqlite`

The database connection is then exported through the module so that other parts of the application can use it.

## 12. Connect the database to the application

Import the database connection into `src/server.js`:

`const db = require("../data/database");`

This loads the SQLite database when the application starts.

## 13. Verify the SQLite connection

Start the application with:

`npm start`

The expected output is:

`Server running on http://localhost:3000`

If the application starts without errors, the Express application can successfully load the SQLite database connection.

## 14. Create the tasks table

Update `data/database.js` to create the `tasks` table if it does not already exist.

The table contains:

- `id` — unique identifier for each task
- `title` — task title
- `completed` — indicates whether the task is completed

The table is created with:

`CREATE TABLE IF NOT EXISTS tasks`

This ensures that the table is created automatically when the application starts.

## 15. Export the database connection

Export the SQLite database connection from `data/database.js`:

`module.exports = db;`

This allows other application files, such as `src/server.js`, to access the database connection.

## 16. Create the GET /tasks endpoint

Add a GET endpoint to `src/server.js`:

`GET /tasks`

The endpoint reads all records from the `tasks` table and returns them as a JSON response.

The application uses the following SQL query:

`SELECT * FROM tasks`

## 17. Verify the tasks endpoint

Start the application with:

`npm start`

Open the following URL in a web browser:

`http://localhost:3000/tasks`

The endpoint should return the tasks stored in the database as JSON.

For example:

`[{"id":1,"title":"Learn SQLite","completed":0},{"id":2,"title":"Learn SQLite","completed":0}]`

This verifies that Express can query the SQLite database and return persistent data through an HTTP API.

## 18. Troubleshooting the database connection

During testing, the `/tasks` endpoint initially returned:

`TypeError: db.prepare is not a function`

The cause was that `data/database.js` created the database connection but did not export it.

The issue was fixed by adding:

`module.exports = db;`

After restarting the application, the `/tasks` endpoint successfully returned the stored tasks.

## 19. Add JSON request body parsing

Update `src/server.js` to enable Express to read JSON data sent in HTTP request bodies:

`app.use(express.json());`

This allows the API to receive JSON data when creating or updating tasks.

## 20. Create the POST /tasks endpoint

Add a POST endpoint to `src/server.js`:

`POST /tasks`

The endpoint reads the task title from the request body and inserts a new task into the SQLite database.

The endpoint returns the newly created task as JSON, including its generated ID and default `completed` value.

## 21. Verify the POST /tasks endpoint

Start the application with:

`npm start`

Use PowerShell to create a new task:

`Invoke-RestMethod -Uri "http://localhost:3000/tasks" -Method Post -ContentType "application/json" -Body '{"title":"Learn Express"}'`

The endpoint successfully created a new task and returned its ID, title, and `completed` value.

## 22. Create the GET /tasks/:id endpoint

Add a GET endpoint to retrieve a single task using its ID:

`GET /tasks/:id`

The endpoint reads the ID from the URL and searches for the corresponding task in the SQLite database.

## 23. Verify the GET /tasks/:id endpoint

Use PowerShell to retrieve a specific task:

`Invoke-RestMethod -Uri "http://localhost:3000/tasks/3" -Method Get`

The endpoint successfully returned the requested task as JSON.

## 24. Create the PUT /tasks/:id endpoint

Add a PUT endpoint to update an existing task:

`PUT /tasks/:id`

The endpoint accepts a new `title` and `completed` value from the JSON request body and updates the corresponding database record.

## 25. Verify the PUT /tasks/:id endpoint

Use PowerShell to update a task:

`Invoke-RestMethod -Uri "http://localhost:3000/tasks/3" -Method Put -ContentType "application/json" -Body '{"title":"Learn Express and SQLite","completed":1}'`

The endpoint successfully updated the task and returned the updated record.

## 26. Create the DELETE /tasks/:id endpoint

Add a DELETE endpoint to remove an existing task:

`DELETE /tasks/:id`

The endpoint reads the task ID from the URL and deletes the corresponding record from the SQLite database.

## 27. Verify the DELETE /tasks/:id endpoint

Use PowerShell to delete a task:

`Invoke-RestMethod -Uri "http://localhost:3000/tasks/3" -Method Delete`

The endpoint returned a confirmation message.

A subsequent request for the same task returned no task, confirming that the record was deleted.

## 28. Verify the complete CRUD API

The application now supports the complete CRUD operations:

- `POST /tasks` — create a task
- `GET /tasks` — retrieve all tasks
- `GET /tasks/:id` — retrieve one task
- `PUT /tasks/:id` — update a task
- `DELETE /tasks/:id` — delete a task

The CRUD operations were tested locally using PowerShell and successfully interacted with the SQLite database.

## 29. Add API error handling

Add validation and error responses to the API.

The `GET /tasks/:id` endpoint returns:

`404 Task not found`

when the requested task does not exist.

The `POST /tasks` endpoint returns:

`400 Title is required`

when the request does not contain a task title.

The `PUT /tasks/:id` endpoint validates that both `title` and `completed` are provided.

It returns:

`400 Title is required`

when the title is missing.

It returns:

`400 Completed is required`

when the completed value is missing.

The PUT endpoint also returns:

`404 Task not found`

when the requested task does not exist.

These cases were tested locally using PowerShell.