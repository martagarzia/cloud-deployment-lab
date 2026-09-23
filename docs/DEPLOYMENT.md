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

## 30. Prepare the Ubuntu Server

Create an Ubuntu Server virtual machine using VirtualBox.

The VM was configured with:

- 4096 MB RAM
- 2 CPU cores
- 25 GB virtual disk
- Ubuntu Server 26.04 LTS
- Italian keyboard layout
- No proxy
- LVM enabled
- Disk encryption disabled
- OpenSSH server enabled

Create a Linux user for administration and deployment.

The server was configured with the hostname:

`cloud-deployment-lab`

The Ubuntu installation was completed successfully.

## 31. Configure SSH access

Configure VirtualBox port forwarding to allow SSH access from the Windows host.

The following port forwarding rule was created:

- Host IP: `127.0.0.1`
- Host port: `2222`
- Guest port: `22`
- Protocol: `TCP`

SSH access was verified from Windows with:

`ssh marta@127.0.0.1 -p 2222`

The connection successfully opened a shell on the Ubuntu Server.

## 32. Configure the Ubuntu firewall

Check the UFW firewall status:

`sudo ufw status`

The firewall was initially inactive.

Allow SSH connections before enabling the firewall:

`sudo ufw allow 22/tcp`

Enable UFW:

`sudo ufw enable`

Verify the active rules:

`sudo ufw status`

SSH on port `22/tcp` was confirmed as allowed.

## 33. Install Node.js on Ubuntu

Update the Ubuntu package list:

`sudo apt update`

Install Node.js and npm:

`sudo apt install nodejs npm`

Verify the installation:

`node --version`
`npm --version`

The server was configured with:

- Node.js `v22.22.1`
- npm `9.2.0`

## 34. Install SQLite on Ubuntu

Install the SQLite command-line tools:

`sudo apt install sqlite3`

Verify the installation:

`sqlite3 --version`

SQLite `3.46.1` was installed successfully.

The `sqlite3` command-line tool is used to inspect and manage SQLite databases directly from the Ubuntu server.

The Node.js application continues to use `better-sqlite3` to communicate with SQLite.

## 35. Clone the repository on Ubuntu

Verify that Git is installed:

`git --version`

Clone the repository using SSH authentication:

`git clone git@github.com:martagarzia/cloud-deployment-lab.git`

An ED25519 SSH key was generated on the Ubuntu server and added to the GitHub account.

GitHub SSH authentication was verified with:

`ssh -T git@github.com`

The repository was then successfully cloned to:

`/home/marta/cloud-deployment-lab`

## 36. Install production dependencies

Move into the project directory:

`cd ~/cloud-deployment-lab`

Install the dependencies defined in `package-lock.json`:

`npm ci`

The installation completed successfully and reported no vulnerabilities.

`npm ci` was used to install the exact dependency versions recorded in the lock file.

## 37. Configure the production database

The SQLite database file is not stored in Git because it is excluded by `.gitignore`.

After starting the application on Ubuntu, the database was automatically created at:

`data/database.sqlite`

The database file was verified with:

`ls -lh ~/cloud-deployment-lab/data/database.sqlite`

The production database was created successfully.

## 38. Run the application on Ubuntu

Start the application temporarily with:

`npm start`

The application reported:

`Server running on http://localhost:3000`

The application was verified locally from the Ubuntu server with:

`curl http://localhost:3000/`

The expected response was:

`Cloud Deployment Lab is running!`

## 39. Create the systemd service

Create the systemd service file:

`/etc/systemd/system/cloud-deployment-lab.service`

The service runs the Node.js application as the `marta` user from:

`/home/marta/cloud-deployment-lab`

The service starts the application with:

`/usr/bin/node src/server.js`

The service is configured to restart automatically if the application stops.

Reload systemd after creating or modifying the service:

`sudo systemctl daemon-reload`

Enable the service at system startup:

`sudo systemctl enable cloud-deployment-lab.service`

Start the service:

`sudo systemctl start cloud-deployment-lab.service`

Check the service status:

`sudo systemctl status cloud-deployment-lab.service`

The service was successfully verified with:

`Active: active (running)`

The application is now managed by systemd and starts automatically when the Ubuntu server boots.

## 40. Configure Nginx

Install Nginx on the Ubuntu server:

`sudo apt install nginx`

Verify that Nginx is running:

`sudo systemctl status nginx`

Nginx was successfully installed and verified as `active (running)`.

## 40.1 Configure Nginx as a reverse proxy

Create the application configuration:

`/etc/nginx/sites-available/cloud-deployment-lab`

The configuration listens on port `80` and forwards incoming HTTP requests to the Node.js application running on port `3000`.

The reverse proxy forwards requests to:

`http://127.0.0.1:3000`

Enable the application configuration:

`sudo ln -s /etc/nginx/sites-available/cloud-deployment-lab /etc/nginx/sites-enabled/cloud-deployment-lab`

Remove the default Nginx site to avoid a conflicting `server_name` configuration:

`sudo rm /etc/nginx/sites-enabled/default`

Test the Nginx configuration:

`sudo nginx -t`

The configuration test completed successfully.

Reload Nginx to apply the new configuration:

`sudo systemctl reload nginx`

Verify the reverse proxy locally:

`curl http://localhost/`

The request was successfully forwarded to the Node.js application and returned:

`Cloud Deployment Lab is running!`