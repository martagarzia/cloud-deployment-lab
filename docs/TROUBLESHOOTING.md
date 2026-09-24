# Troubleshooting

## 1. Check the application service

Check whether the systemd service is running:

`sudo systemctl status cloud-deployment-lab.service`

If the service is not running, restart it:

`sudo systemctl restart cloud-deployment-lab.service`

Verify that it is active:

`sudo systemctl is-active cloud-deployment-lab.service`

## 2. Check application logs

View the recent application logs with:

`sudo journalctl -u cloud-deployment-lab.service -n 50`

Follow the logs in real time with:

`sudo journalctl -u cloud-deployment-lab.service -f`

## 3. Check Nginx

Test the Nginx configuration:

`sudo nginx -t`

Check the Nginx service:

`sudo systemctl status nginx`

If necessary, restart Nginx:

`sudo systemctl restart nginx`

## 4. Check HTTPS

Verify that the application is reachable through HTTPS:

`curl https://lemiericette.de`

Check the health endpoint:

`curl https://lemiericette.de/health`

The health endpoint should return:

`{"status":"ok"}`

## 5. Check the deployment script

Run the deployment script manually:

`~/cloud-deployment-lab/deploy.sh`

The script should pull the latest changes from GitHub, install the dependencies, restart the application service, and report:

`Deployment completed successfully.`

## 6. Check the database

Verify that the production database exists:

`ls -lh ~/cloud-deployment-lab/data/database.sqlite`

Check the integrity of a database backup:

`sqlite3 ~/backups/database-YYYY-MM-DD-HHMMSS.sqlite "PRAGMA integrity_check;"`

A valid database backup should return:

`ok`

## 7. Check firewall rules

Display the current UFW configuration:

`sudo ufw status`

The server should allow the required ports for SSH, HTTP, and HTTPS.