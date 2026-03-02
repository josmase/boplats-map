#!/bin/sh

if [ -z "$API_URL" ]; then
  echo "API_URL is not set. Using default http://api:3000"
  API_URL="http://api:3000"
fi

# Replace the proxy_pass URL in nginx config
sed -i "s|proxy_pass http://api:3000|proxy_pass $API_URL|g" /etc/nginx/conf.d/default.conf

echo "Updated nginx proxy_pass to $API_URL"