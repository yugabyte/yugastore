#!/bin/bash

cd /usr/local/yugastore

config_tmpl='{
  "DB_HOST": $db_host,
  "APP_HOST": $app_host,
  "APP_PORT": $app_port
}'

jq \
--arg db_host "$DB_HOST" \
--arg app_host "$APP_HOST" \
--arg app_port "$APP_PORT" \
-n "$config_tmpl" > config.json

# Init the database.
node models/yugabyte/db_init.js

# Start the rest service
npm start
