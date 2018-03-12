# Yugastore

This is a sample, end-to-end functional bookstore (or more generally, an e-commerce app) built using YugaByte DB. This app show how YugaByte-DB makes this development very simple by providing a Redis API, as well as a traditional tables/rows/structured query-language based API.

Uses the following stack:
* Frontend: ReactJS
* Backend: Express and NodeJS
* Database: YugaByte DB

The app is continuously being improved. It currently features:
- products catalog listing
- product details page
- static product grouping (such as "business books", "mystery books", etc)
- dynamic product grouping (such as "most reviewed", "highest rated", etc)
- tracking for pageviews (both counts and referral for firther analysis)
- Coming soon: a shopping cart, online checkout, order history tracking.

![YugaStore](https://raw.githubusercontent.com/YugaByte/yugastore/master/screenshots/yugastore-screenshot.png)

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

You should be able to see the IOPS on the YugaByte DB UI. If you have installed it on your localhost, with default settings, you can see this on the [/tablet-servers](http://localhost:7000/tablet-servers) page. It should look something as follows.

![YugaByte DB load from Yugastore and load tester](https://raw.githubusercontent.com/YugaByte/yugastore/master/screenshots/yugastore-yb-iops-ui.png)
