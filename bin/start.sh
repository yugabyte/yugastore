#!/bin/bash

cd /usr/local/yugastore

# Init the database.
node models/yugabyte/db_init.js

# Start the rest service
npm start
