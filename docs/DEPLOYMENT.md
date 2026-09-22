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