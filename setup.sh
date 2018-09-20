docker-compose down

docker-compose pull

docker-compose up -d
HOST_PORT=$(docker-compose port wordpress 80 | awk -F : '{printf $2}')
echo -e "Attempting to connect to WordPress..."
until $(curl -L http://localhost:4000 -so - 2>&1 | grep -q "WordPress"); do
    echo -n '.'
    sleep 5
done
echo ''

echo "wordpress installing"

docker-compose run --rm -u 33 cli core install --title="elementor" --admin_user=admin --admin_password=password --admin_email=test@test.com --skip-email --url=http://localhost:4000
docker-compose run --rm -u 33 cli plugin install elementor
docker-compose run --rm cli plugin activate elementor
echo "wordpress installed "