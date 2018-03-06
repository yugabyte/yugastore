const { Client } = require('pg')
const client = new Client()

client.connect()

var createTableStmt =
  'CREATE TABLE products(' +
  '  id INTEGER PRIMARY KEY,' +
  '  name TEXT,' +
  '  description TEXT,' +
  '  price FLOAT,' +
  '  author TEXT,' +
  '  type TEXT,' +
  '  img TEXT,' +
  '  category TEXT' +
  ');'

client.query(createTableStmt, (err, res) => {
  console.log(err ? err.stack : res)
  client.end()
})

