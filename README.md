# yb-ecommerce

Sample e-commerce app with a products catalog listing, product details page and a shopping cart for online checkout.

Uses the following stack:
* UI: React
* REST server: Express and NodeJS
* Database: pluggable. Can use either the following:
    * YugaByte DB
    * PostgreSQL

To run the REST API server do:
```
$ cd yb-ecommerce
$ PORT=3001 node bin/www
```

To run the webserver do:
```
$ cd yb-ecommerce/ui
$ npm install # First time only
$ npm start
```
