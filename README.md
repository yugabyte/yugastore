# yugastore

Sample e-commerce app with a products catalog listing, product details page and a shopping cart for online checkout.

Uses the following stack:
* Frontend: ReactJS
* Backend: Express and NodeJS
* Database: YugaByte DB

Run the following to populate data:
```
node models/yugabyte/db_init.js
```

Start the REST API server using:
```
$ cd yugastore
$ PORT=3001 npm start
```

Start the webserver using:
```
$ cd yugastore/ui
$ npm install # First time only
$ npm start
```
