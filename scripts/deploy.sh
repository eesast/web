echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t eesast/web:latest .
docker push eesast/web:latest
