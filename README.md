# Cloud Deployment Lab

A hands-on project focused on building, deploying, and managing a Node.js web application on an Ubuntu VPS.

## Project Overview

The project consists of a Node.js and Express application with a SQLite database.

The application is developed locally, versioned with Git and GitHub, and deployed to an Ubuntu VPS running on Hetzner Cloud.

The production environment uses systemd to manage the application process, Nginx as a reverse proxy, and Let's Encrypt for HTTPS.

## Technologies

- Node.js
- Express
- SQLite
- Git
- GitHub
- Ubuntu
- Hetzner Cloud
- systemd
- Nginx
- Let's Encrypt
- UFW
- Cron

## Application Features

- REST API for task management
- Create tasks
- Read tasks
- Update tasks
- Delete tasks
- SQLite persistent storage
- Application health check endpoint

## Deployment

The application is deployed on an Ubuntu VPS and managed as a systemd service.

Nginx acts as a reverse proxy between the public HTTPS endpoint and the Node.js application running on port 3000.

HTTPS is provided through a Let's Encrypt certificate.

The production database is backed up automatically every day and old backups are removed after the configured retention period.

## Automated Deployment

Application updates are deployed using the `deploy.sh` script.

The script:

1. Pulls the latest changes from GitHub.
2. Installs the production dependencies with `npm ci`.
3. Restarts the systemd service.
4. Verifies that the application service is running.

## Health Check

The application provides a health check endpoint:

`https://lemiericette.de/health`

A successful response is:

`{"status":"ok"}`

## Documentation

The deployment process is documented in:

`docs/DEPLOYMENT.md`

Troubleshooting procedures are documented in:

`docs/TROUBLESHOOTING.md`

## Project Goals

- Build a simple web application
- Work with a SQLite database
- Expose a REST API
- Deploy the application to an Ubuntu VPS
- Manage the application with systemd
- Configure Nginx as a reverse proxy
- Enable HTTPS
- Configure automatic database backups
- Implement a health check
- Automate application deployment
- Document the deployment and troubleshooting process