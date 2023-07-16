# Identity-Reconciliation
## Tech Stacks Used
  1. nodeJS -> Backend
  2. MySQL -> Database
## To run the application
  1. Clone the git repository
  2. Switch to dev branch
  3. Run docker compose up
  
</br>If the app shows connection refused for the first time then **_docker compose down_** and restart the application or set the sleep time to **_15 seconds_** in docker compose file while running the application for first time
## Ports Exposed
  3001 -> Node Application</br>
  3307 -> SQL server (use this port to connect the database through MySQL Workbench)
### Run http://localhost:3001/api/identify for identify route
Also check out /api/list_all_users and /api/add_new_user for listing all users and creating user respectively
