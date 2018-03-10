const cassandra = require('cassandra-driver');
const redis = require("redis")
const async = require('async');
const assert = require('assert');

var sample_data = require("../sample_data.json");
console.log("Parsed %d product items.", sample_data.products.length);

//
// Create a YugaByte client for Cassandra and Redis APIs.
//
const ybRedisClient = redis.createClient();
const ybCassandraClient = new cassandra.Client({ contactPoints: ['127.0.0.1'] });
ybCassandraClient.connect(function (err) {
  assert.ifError(err);
  console.log("Connected to cluster.");
  createKeyspace();
});

//
// Create the keyspace.
//
function createKeyspace() {
  ybCassandraClient.execute('CREATE KEYSPACE IF NOT EXISTS yb_ecommerce;', function (err, result) {
    console.log('Successfully created keyspace yb_ecommerce.');
    createProductsTable();
  });
}

//
// Create the tables.
//
function createProductsTable() {
  const create_table =
    'CREATE TABLE IF NOT EXISTS yb_ecommerce.products (' +
    '  id int PRIMARY KEY, ' +
    '  name TEXT, ' +
    '  description TEXT, ' +
    '  price DOUBLE, ' +
    '  author TEXT, ' +
    '  type TEXT, ' +
    '  img TEXT, ' +
    '  category TEXT' +
    ');'
  ybCassandraClient.execute(create_table, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Successfully created table yb_ecommerce.products.');
    loadProducts();
  });
}

//
// Load the sample data.
//
function loadProducts() {
  const insert = "INSERT INTO yb_ecommerce.products " +
                 "  (id, name, description, price, author, type, img, category)" +
                 " VALUES" +
                 "  (?, ?, ?, ?, ?, ?, ?, ?);"
  // Prepare a batch insert.
  var insert_batch = [];
  for (var i = 0; i < sample_data.products.length; i++) {
    var p = sample_data.products[i];
    var params =
      [p.id, p.name, p.description, p.price, p.author, p.type, p.img, p.category];

    insert_batch.push({
      query: insert,
      params: params
    });
  }
  // Prepare and insert the batch.
  ybCassandraClient.batch(insert_batch, { prepare: true }, function(err) {
     assert.ifError(err);
     console.log('Inserted %d rows into table yb_ecommerce.products.', insert_batch.length);
     loadReviews();
  });
}

//
// For each of the products load the reviews.
//
function loadReviews() {
  for (var i = 0; i < sample_data.products.length; i++) {
    var product = sample_data.products[i];
    var numReviews = Math.floor(Math.random() * 1000) + 1;
    var totalstars = Math.floor(Math.random() * 2 * numReviews) + 3 * numReviews;
    var avgStars = totalstars / numReviews;
    ybRedisClient.hmset("product:" + product.id, ["stars", avgStars.toFixed(2),
                                                  "num_reviews", numReviews]);
    ybRedisClient.zadd("allproducts:num_reviews", numReviews, product.id);
    ybRedisClient.zadd("allproducts:num_reviews", totalstars, product.id);
  }
  teardown();
}

//
// Close the client.
//
function teardown() {
  console.log('Shutting down YugaByte client connection for Cassandra API.');
  ybCassandraClient.shutdown();

  ybRedisClient.quit(function (err, res) {
    console.log('Shutting down YugaByte client connection for Redis API.');
  });
}
