cd ~/healthcare-is-web-app
sudo systemctl stop healthcare-is-web-app.service
sudo docker compose up -d --no-deps --build nextapp
sudo docker compose down
sudo systemctl start healthcare-is-web-app.service