#!/bin/bash

cd /usr/local/yugastore

# Override the conf to use the kubernetes conf.
cp config/config.kubernetes.json config.json

# Init the database.
models/yugabyte/db_init.js config.json

# Start the rest service
npm start