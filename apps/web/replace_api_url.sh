#!/bin/sh

if [ -z "$API_URL" ]; then
  echo "API_URL is not set. Exiting."
  exit 1
fi

# Find and replace http://localhost:3000 with the value of API_URL in all files in /usr/share/nginx/html
find /usr/share/nginx/html -type f -exec sed -i "s|http://localhost:3000|$API_URL|g" {} +

echo "Replaced http://localhost:3000 with $API_URL in /usr/share/nginx/html"