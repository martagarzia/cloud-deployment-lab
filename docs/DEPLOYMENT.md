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

## 30. Create the Hetzner VPS

Create a cloud server on Hetzner for the production deployment.

The server was configured with:

- Regular Performance
- Shared Resources
- x86 (AMD)
- CPX12
- 1 vCPU
- 2 GB RAM
- 40 GB SSD
- Falkenstein location
- Ubuntu 26.04
- Public IPv4
- Public IPv6
- No private network
- No volume
- No Hetzner backups
- No placement group
- No labels
- No cloud config

The server was named:

`cloud-deployment-lab`

The public IPv4 address was:

`188.245.199.140`

The server was created with an existing Windows SSH public key.

## 31. Connect to the Hetzner server

Connect to the server from Windows using SSH:

`ssh root@188.245.199.140`

Verify the Ubuntu version:

`lsb_release -a`

The server was running:

- Ubuntu 26.04.1 LTS
- Release `26.04`
- Codename `resolute`

Update the system:

`sudo apt update`

Upgrade installed packages:

`sudo apt upgrade -y`

The server was then rebooted and the SSH connection was successfully restored.

## 32. Create the deployment user

Create the `marta` Linux user:

`adduser marta`

Add the user to the `sudo` group:

`usermod -aG sudo marta`

Verify the user's groups:

`groups marta`

The user was confirmed as a member of:

`marta sudo users`

## 33. Configure SSH access for the deployment user

Create the SSH directory for `marta`:

`mkdir -p /home/marta/.ssh`

Copy the existing authorized SSH key:

`cp /root/.ssh/authorized_keys /home/marta/.ssh/authorized_keys`

Set the correct ownership:

`chown -R marta:marta /home/marta/.ssh`

Set the SSH directory permissions:

`chmod 700 /home/marta/.ssh`

Set the authorized keys file permissions:

`chmod 600 /home/marta/.ssh/authorized_keys`

Verify SSH access from Windows:

`ssh marta@188.245.199.140`

The connection was successfully established using the `marta` user.

## 34. Configure the Ubuntu firewall

Check the UFW firewall status:

`sudo ufw status`

Allow SSH connections:

`sudo ufw allow 22/tcp`

Allow HTTP connections for Nginx:

`sudo ufw allow 80/tcp`

Allow HTTPS connections for Nginx:

`sudo ufw allow 443/tcp`

Enable UFW:

`sudo ufw enable`

Verify the active rules:

`sudo ufw status`

The firewall was successfully enabled with the following ports allowed:

- `22/tcp` — SSH
- `80/tcp` — HTTP
- `443/tcp` — HTTPS

The rules were enabled for both IPv4 and IPv6.

## 35. Install Node.js on the Hetzner server

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

## 36. Install SQLite on the Hetzner server

Install the SQLite command-line tools:

`sudo apt install sqlite3`

The `sqlite3` command-line tool is used to inspect and manage SQLite databases directly from the Ubuntu server.

The Node.js application continues to use `better-sqlite3` to communicate with SQLite.

## 37. Configure GitHub SSH authentication

Check the SSH directory for the `marta` user:

`ls -la ~/.ssh`

A GitHub-specific SSH key was not present, so a new ED25519 key was generated:

`ssh-keygen -t ed25519 -C "marta@cloud-deployment-lab"`

The public key was displayed with:

`cat ~/.ssh/id_ed25519.pub`

The public key was added to the GitHub account as an authentication key with the title:

`cloud-deployment-lab Hetzner VPS`

GitHub SSH authentication was verified with:

`ssh -T git@github.com`

## 38. Clone the repository on the Hetzner server

Clone the repository using SSH authentication:

`git clone git@github.com:martagarzia/cloud-deployment-lab.git`

The repository was successfully cloned to:

`/home/marta/cloud-deployment-lab`

## 39. Install production dependencies

Move into the project directory:

`cd ~/cloud-deployment-lab`

Install the dependencies defined in `package-lock.json`:

`npm ci`

`npm ci` installs the exact dependency versions recorded in the lock file and is suitable for reproducible deployments.

The production dependencies were installed successfully.

## 40. Configure the production database

The SQLite database file is not stored in Git because it is excluded by `.gitignore`.

The production database will be created automatically when the application starts.

The database will be created at:

`data/database.sqlite`

## 41. Run the application on the Hetzner server

Start the application temporarily with:

`npm start`

The application should report:

`Server running on http://localhost:3000`

Verify the application locally from the server with:

`curl http://localhost:3000/`

The expected response is:

`Cloud Deployment Lab is running!`

## 42. Create the systemd service

Create the systemd service file:

`/etc/systemd/system/cloud-deployment-lab.service`

Configure the service to run the Node.js application as the `marta` user from:

`/home/marta/cloud-deployment-lab`

The application should be started with:

`/usr/bin/node src/server.js`

The service should restart automatically if the application stops.

Reload systemd:

`sudo systemctl daemon-reload`

Enable the service:

`sudo systemctl enable cloud-deployment-lab.service`

Start the service:

`sudo systemctl start cloud-deployment-lab.service`

Verify the service:

`sudo systemctl status cloud-deployment-lab.service`

## 43. Configure Nginx

Install Nginx:

`sudo apt install nginx`

Verify that Nginx is running:

`sudo systemctl status nginx`

## 44. Configure Nginx as a reverse proxy

Create the application configuration:

`/etc/nginx/sites-available/cloud-deployment-lab`

Configure Nginx to listen on port `80` and forward requests to:

`http://127.0.0.1:3000`

Enable the application configuration:

`sudo ln -s /etc/nginx/sites-available/cloud-deployment-lab /etc/nginx/sites-enabled/cloud-deployment-lab`

Remove the default Nginx site:

`sudo rm /etc/nginx/sites-enabled/default`

Test the Nginx configuration:

`sudo nginx -t`

Reload Nginx:

`sudo systemctl reload nginx`

Verify the reverse proxy:

`curl http://localhost/`

## 45. Create the Hetzner VPS

Create a cloud server on Hetzner for the production deployment.

The server was configured with:

- Regular Performance
- Shared Resources
- x86 (AMD)
- CPX12
- 1 vCPU
- 2 GB RAM
- 40 GB SSD
- Falkenstein location
- Ubuntu 26.04
- Public IPv4
- Public IPv6
- No private network
- No volume
- No Hetzner backups
- No placement group
- No labels
- No cloud config

The server was named:

`cloud-deployment-lab`

The public IPv4 address was:

`188.245.199.140`

A Windows SSH public key was added during server creation.

## 46. Connect to the Hetzner server

Connect to the server from Windows using SSH:

`ssh root@188.245.199.140`

Verify the Ubuntu version:

`lsb_release -a`

The server was running:

- Ubuntu 26.04.1 LTS
- Release `26.04`
- Codename `resolute`

Update the system:

`sudo apt update`

Upgrade installed packages:

`sudo apt upgrade -y`

The server was rebooted after the system upgrade and the SSH connection was successfully restored.

## 47. Create the deployment user

Create the `marta` Linux user:

`adduser marta`

Add the user to the `sudo` group:

`usermod -aG sudo marta`

Verify the user's groups:

`groups marta`

The user was confirmed as a member of:

`marta sudo users`

## 48. Configure SSH access for the deployment user

Create the SSH directory for `marta`:

`mkdir -p /home/marta/.ssh`

Copy the existing authorized SSH key:

`cp /root/.ssh/authorized_keys /home/marta/.ssh/authorized_keys`

Set the correct ownership:

`chown -R marta:marta /home/marta/.ssh`

Set the SSH directory permissions:

`chmod 700 /home/marta/.ssh`

Set the authorized keys file permissions:

`chmod 600 /home/marta/.ssh/authorized_keys`

Verify SSH access from Windows:

`ssh marta@188.245.199.140`

The connection was successfully established using the `marta` user.

## 49. Configure the Ubuntu firewall

Check the UFW firewall status:

`sudo ufw status`

Allow SSH connections:

`sudo ufw allow 22/tcp`

Allow HTTP connections:

`sudo ufw allow 80/tcp`

Allow HTTPS connections:

`sudo ufw allow 443/tcp`

Enable UFW:

`sudo ufw enable`

Verify the active rules:

`sudo ufw status`

The firewall was successfully enabled with the following ports allowed:

- `22/tcp` — SSH
- `80/tcp` — HTTP
- `443/tcp` — HTTPS

The rules were enabled for both IPv4 and IPv6.

## 50. Install Node.js on the Hetzner server

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

## 51. Install SQLite on the Hetzner server

Install the SQLite command-line tools:

`sudo apt install sqlite3`

SQLite was installed successfully.

The `sqlite3` command-line tool can be used to inspect and manage SQLite databases directly from the Ubuntu server.

The Node.js application uses `better-sqlite3` to communicate with SQLite.

## 52. Configure GitHub SSH authentication

Check the SSH directory for the `marta` user:

`ls -la ~/.ssh`

A GitHub-specific SSH key was not present, so a new ED25519 key was generated:

`ssh-keygen -t ed25519 -C "marta@cloud-deployment-lab"`

Display the public key:

`cat ~/.ssh/id_ed25519.pub`

The public key was added to the GitHub account as an authentication key with the title:

`cloud-deployment-lab Hetzner VPS`

Verify GitHub SSH authentication:

`ssh -T git@github.com`

GitHub authentication was successfully verified.

## 53. Clone the repository on the Hetzner server

Clone the repository using SSH authentication:

`git clone git@github.com:martagarzia/cloud-deployment-lab.git`

The repository was successfully cloned to:

`/home/marta/cloud-deployment-lab`

## 54. Install production dependencies

Move into the project directory:

`cd ~/cloud-deployment-lab`

Install the dependencies defined in `package-lock.json`:

`npm ci`

`npm ci` installs the exact dependency versions recorded in the lock file and is suitable for reproducible deployments.

The production dependencies were installed successfully.

## 55. Register the production domain

Register the domain used for the production deployment:

`lemiericette.de`

The domain was registered through Hetzner.

## 56. Transfer the DNS zone to the production project

The DNS zone for `lemiericette.de` was initially associated with the `konsoleH` project.

Transfer the DNS zone to the `Default` Hetzner Cloud project so that the domain and the production VPS are managed in the same project.

The DNS zone contained existing records, which were preserved during the transfer.

## 57. Configure the domain IPv4 records

Update the A records for the domain to point to the Hetzner VPS.

Configure:

- `@` → `188.245.199.140`
- `www` → `188.245.199.140`

The remaining DNS records were left unchanged.

Verify the DNS configuration from a client machine with:

`nslookup lemiericette.de`

The domain resolved to the VPS IPv4 address.

## 58. Configure the domain IPv6 records

Update the AAAA records to point to the IPv6 address configured on the Hetzner VPS.

Configure:

- `@` → `2a01:4f8:c012:6e1b::1`
- `www` → `2a01:4f8:c012:6e1b::1`

Verify the IPv6 address on the server with:

`ip -6 addr`

The address was confirmed on the `eth0` network interface.

## 59. Configure Nginx for the domain

Update the Nginx server configuration:

`/etc/nginx/sites-available/cloud-deployment-lab`

Configure Nginx to accept:

- `lemiericette.de`
- `www.lemiericette.de`

Nginx continues to forward requests to the Node.js application running on:

`http://127.0.0.1:3000`

Test the configuration with:

`sudo nginx -t`

Reload Nginx with:

`sudo systemctl reload nginx`

## 60. Install Certbot

Install Certbot on the Ubuntu server:

`sudo snap install --classic certbot`

Verify the installation:

`certbot --version`

The installed version was:

`certbot 5.8.0`

## 61. Request the HTTPS certificate

Request a Let's Encrypt certificate for the production domain:

`sudo certbot --nginx -d lemiericette.de -d www.lemiericette.de`

Certbot successfully issued the certificate.

The certificate files were created under:

`/etc/letsencrypt/live/lemiericette.de/`

The certificate is configured for automatic renewal by Certbot.

## 62. Configure the HTTPS certificate in Nginx

Certbot initially issued the certificate but could not automatically install it because the Nginx configuration used the VPS IP address as the `server_name`.

The Nginx configuration was updated to use:

`server_name lemiericette.de www.lemiericette.de;`

Test the Nginx configuration:

`sudo nginx -t`

Reload Nginx:

`sudo systemctl reload nginx`

Install the existing certificate:

`sudo certbot install --cert-name lemiericette.de`

The certificate was successfully deployed to the Nginx configuration.

## 63. Configure HTTP to HTTPS redirection

Configure Nginx to redirect HTTP requests to HTTPS:

`http://lemiericette.de`

→

`https://lemiericette.de`

The redirect was configured with an HTTP `301 Moved Permanently` response.

Verify the redirect from the server:

`curl -I http://lemiericette.de`

The expected response is:

`HTTP/1.1 301 Moved Permanently`

with:

`Location: https://lemiericette.de/`

## 64. Verify HTTPS

Verify that the application is accessible through HTTPS:

`curl -I https://lemiericette.de`

The server returned:

`HTTP/1.1 200 OK`

This confirmed that:

- DNS resolves to the production VPS
- Nginx accepts HTTPS requests
- The Let's Encrypt certificate is installed
- Nginx forwards HTTPS requests to the Node.js application
- The application responds successfully

## 65. Verify external access

The production website was tested from an external network:

`https://lemiericette.de`

The website was successfully accessible.

The original network used for testing blocked the domain through FortiGuard because it was classified as a `Newly Observed Domain`. The same domain was accessible from another network, confirming that the block was caused by the network security filter rather than the server or HTTPS configuration.

## 66. Verify automatic HTTPS certificate renewal

Test the Let's Encrypt automatic renewal process without actually renewing the certificate:

`sudo certbot renew --dry-run`

The renewal simulation completed successfully.

This confirms that the Let's Encrypt certificate for:

- `lemiericette.de`
- `www.lemiericette.de`

can be renewed automatically.

## 67. Create a production database backup

Create a directory for production database backups:

`mkdir -p ~/backups`

Create a timestamped backup of the production SQLite database:

`cp ~/cloud-deployment-lab/data/database.sqlite ~/backups/database-$(date +%Y-%m-%d-%H%M%S).sqlite`

Verify the backup:

`ls -lh ~/backups`

The first production backup was successfully created.

## 68. Verify database backup integrity

Verify that the backup can be opened and checked by SQLite:

`sqlite3 ~/backups/database-2026-09-24-120748.sqlite "PRAGMA integrity_check;"`

The command returned:

`ok`

This confirms that the backup database passed the SQLite integrity check.

## 69. Automate database backups

Verify that the `cron` service is installed and running:

`sudo systemctl status cron`

The service was already active on the Ubuntu server.

Create the `marta` user's crontab:

`crontab -e`

Add a daily backup job:

`0 2 * * * cp /home/marta/cloud-deployment-lab/data/database.sqlite /home/marta/backups/database-$(date +\%Y-\%m-\%d-\%H\%M\%S).sqlite`

Verify the configured cron jobs:

`crontab -l`

The backup job was configured to run every day at 02:00.

The backup command was also executed manually to verify that it works correctly.

Two database backup files were successfully created in:

`/home/marta/backups`

## 70. Configure backup retention

Update the daily backup cron job to automatically remove database backups older than 7 days.

The configured cron job is:

`0 2 * * * cp /home/marta/cloud-deployment-lab/data/database.sqlite /home/marta/backups/database-$(date +\%Y-\%m-\%d-\%H\%M\%S).sqlite && find /home/marta/backups -name 'database-*.sqlite' -mtime +7 -delete`

Verify the configuration with:

`crontab -l`

The backup process now:

- Creates a daily SQLite database backup at 02:00.
- Stores backups in `/home/marta/backups`.
- Removes backups older than 7 days.

## 71. Verify the production health endpoint

Verify that the production application responds successfully through Nginx and HTTPS:

`curl -I https://lemiericette.de`

The server returned:

`HTTP/1.1 200 OK`

This confirms that the production request path is working:

`HTTPS → Nginx → Node.js → Express`

## 72. Add an application health check

Add a dedicated health check endpoint to `src/server.js`:

`GET /health`

The endpoint returns:

`{"status":"ok"}`

Deploy the updated application:

`git pull origin main`

Restart the systemd service:

`sudo systemctl restart cloud-deployment-lab.service`

Verify the application locally:

`curl http://localhost:3000/health`

Verify the endpoint through the public HTTPS endpoint:

`curl https://lemiericette.de/health`

Both checks returned:

`{"status":"ok"}`

This confirms that the application is running correctly both locally and through Nginx and HTTPS.

## 73. Create the deployment automation script

Create the deployment script:

`~/cloud-deployment-lab/deploy.sh`

The script performs the following steps:

1. Moves into the project directory.
2. Pulls the latest changes from GitHub.
3. Installs the production dependencies with `npm ci`.
4. Restarts the `cloud-deployment-lab` systemd service.
5. Verifies that the service is running.
6. Prints a success message when the deployment completes.

Make the script executable:

`chmod +x ~/cloud-deployment-lab/deploy.sh`

Run the deployment script with:

`~/cloud-deployment-lab/deploy.sh`

The deployment completed successfully and `npm ci` reported zero vulnerabilities.

## 74. Test the automated deployment

Update the application source code locally and push the change to GitHub.

Run the deployment script on the production server:

`~/cloud-deployment-lab/deploy.sh`

The script successfully:

- Pulled the latest commit from GitHub.
- Installed the production dependencies with `npm ci`.
- Restarted the systemd service.
- Verified that the deployment completed successfully.

The deployed application was then verified through HTTPS:

`curl https://lemiericette.de`

The updated application response was returned successfully:

`Cloud Deployment Lab is running on Hetzner!`

This confirms that the automated deployment process successfully transfers application changes from GitHub to the production VPS.