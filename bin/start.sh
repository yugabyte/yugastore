#!/bin/bash

cd /usr/local/yugastore

# Init the database.
models/yugabyte/db_init.js config.json

# Start the rest service
npm start