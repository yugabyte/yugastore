const { Client } = require('pg')
const client = new Client()

client.connect()

/**
* Create the necessary tables.
*/

var createTableProducts =
  'CREATE TABLE products(' +
  '  id INTEGER PRIMARY KEY, ' +
  '  name TEXT, ' +
  '  description TEXT, ' +
  '  price FLOAT, ' +
  '  author TEXT, ' +
  '  type TEXT, ' +
  '  img TEXT, ' +
  '  category TEXT' +
  ');'

client.query(createTableProducts, (err, res) => {
  console.log(err ? err.stack : res)
  client.end()
})

