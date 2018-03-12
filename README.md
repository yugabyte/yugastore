# yugastore

Sample e-commerce app with a products catalog listing, product details page and a shopping cart for online checkout.

Uses the following stack:
* Frontend: ReactJS
* Backend: Express and NodeJS
* Database: YugaByte DB

# Running the sample app

## Run using docker

You can see the app at http://localhost:3001 after doing the following:

```
docker run -p 3001:3001 -d --network yb-net --name yugastore yugabytedb/yugastore
```

To build a new docker image:

1. Rebuild the ui if something has changed.
```
cd ui && rm -rf build/ && npm run build
```

2. Rebuild the docker image:
```
docker build -t yugastore .
```

## Run locally

1. [Install YugaByte DB](https://docs.yugabyte.com/quick-start/install/).

2. Tweak the `config.json` file if needed.

3. Run the following to populate data:
```
node models/yugabyte/db_init.js
```

4. Start the REST API server using:
```
$ cd yugastore
$ npm install # First time only
$ npm start
```

5. Start the webserver using - this is optional:
```
$ cd yugastore/ui
$ npm install # First time only
$ npm start
```

# Run a load tester

The app comes with a load tester which mimics the behavior of an end user at a very high rate. You can run this as follows:
```
docker exec -it yugastore node /usr/local/yugastore/test/sample-user.js
```

You should be able to see the IOPS on the YugaByte DB UI. If you have installed it on your localhost, with default settings, you can see this on the [/tablet-servers](http://localhost:7000/tablet-servers) page.
