FROM node:latest

# App install directory
WORKDIR /usr/local/yugastore

#
# Install app dependencies.
#

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production, add '--only=production'.
RUN npm install --only=production

# Bundle app source.
COPY app.js ./
ADD bin ./bin
ADD config ./config
ADD models ./models
ADD public ./public
ADD routes ./routes
ADD test ./test
ADD ui ./ui

# Set the config file.
COPY config/config.docker.json ./config.json

# Expose necessary ports.
EXPOSE 3001

# Start npm.
CMD [ "./bin/start.sh" ]

#
# To build:
#   cd ui && npm run build # if ui has changed
#   docker build -t yugastore .
#
# To run:
#   docker run -p 3001:3001 -d --network yb-net --name yugastore yugastore
#
# Stop:
#   docker stop yugastore
#   docker rm yugastore
#
