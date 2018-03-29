#!/bin/bash

cd /usr/local/yugastore

# Override the conf to use the kubernetes conf.
cp config/config.kubernetes.json config.json

# Init the database.
node models/yugabyte/db_init.js

# Start the rest service
npm start
