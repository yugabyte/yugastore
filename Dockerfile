FROM node:latest

# App install directory
WORKDIR /usr/local/yugastore

#
# Install app dependencies.
#

# Install jq for parsing env vars to congfig
ENV JQ_VERSION='1.5'

RUN wget --no-check-certificate https://raw.githubusercontent.com/stedolan/jq/master/sig/jq-release.key -O /tmp/jq-release.key && \
    wget --no-check-certificate https://raw.githubusercontent.com/stedolan/jq/master/sig/v${JQ_VERSION}/jq-linux64.asc -O /tmp/jq-linux64.asc && \
    wget --no-check-certificate https://github.com/stedolan/jq/releases/download/jq-${JQ_VERSION}/jq-linux64 -O /tmp/jq-linux64 && \
    gpg --import /tmp/jq-release.key && \
    gpg --verify /tmp/jq-linux64.asc /tmp/jq-linux64 && \
    cp /tmp/jq-linux64 /usr/bin/jq && \
    chmod +x /usr/bin/jq && \
    rm -f /tmp/jq-release.key && \
    rm -f /tmp/jq-linux64.asc && \
    rm -f /tmp/jq-linux64

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
