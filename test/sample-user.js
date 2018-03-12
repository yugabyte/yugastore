var fs = require('fs')
var http = require('http')

configPath = './config.json';
var options = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));
console.log(options);
APP_HOST = options.APP_HOST
APP_PORT = options.APP_PORT
console.log("Host: " + APP_HOST + ', Port: ' + APP_PORT);

function getPage(urlPath, callback) {
  var url = 'http://' + APP_HOST + ':' + APP_PORT + urlPath;
  console.log(url);
  http.get(url, function(res) {
    console.log("Got response: " + res.statusCode);
    callback();
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}

function viewProduct() {
  productIds = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 16, 17, 18];
  id = Math.floor(Math.random() * productIds.length);
  getPage('/products/details/' + productIds[id], viewProduct);
}

viewProduct();