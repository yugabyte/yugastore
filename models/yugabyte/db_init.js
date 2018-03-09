const cassandra = require('cassandra-driver');
const async = require('async');
const assert = require('assert');

var sample_data = require("../sample_data.json");
console.log("Parsed %d product items.", sample_data.products.length);

//
// Create a YB CQL client.
//
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'] });
client.connect(function (err) {
  assert.ifError(err);
  console.log("Connected to cluster.");
  createKeyspace();
});

//
// Create the keyspace.
//
function createKeyspace() {
  client.execute('CREATE KEYSPACE IF NOT EXISTS yb_ecommerce;', function (err, result) {
    console.log('Successfully created keyspace yb_ecommerce.');
    createTable();
  });
}

//
// Create the table.
//
function createTable() {
  const create_table =
    'CREATE TABLE IF NOT EXISTS yb_ecommerce.products (' +
    '  id int PRIMARY KEY, ' +
    '  name TEXT, ' +
    '  description TEXT, ' +
    '  price FLOAT, ' +
    '  author TEXT, ' +
    '  type TEXT, ' +
    '  img TEXT, ' +
    '  category TEXT' +
    ');'
  client.execute(create_table, function (err, result) {
    console.log('Successfully created table yb_ecommerce.products.');
    loadData();
  });
}

//
// Insert the data using a prepare-bind batch insert statement.
//
function loadData() {
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
  client.batch(insert_batch, { prepare: true }, function(err) {
     assert.ifError(err);
     console.log('Inserted %d rows into table yb_ecommerce.products.', insert_batch.length);
     teardown();
  });
}

//
// Close the client.
//
function teardown() {
  console.log('Shutting down connection.');
  client.shutdown();
}
