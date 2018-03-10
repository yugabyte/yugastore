var express = require('express');
var router = express.Router();

const redis = require("redis")
const yugabyte = require('cassandra-driver');

const ybRedis = redis.createClient();
const ybCassandra =
  new yugabyte.Client({ contactPoints: ['127.0.0.1'],
                        keyspace: 'yb_ecommerce'
                      });
ybCassandra.connect(function (err) {
  if(err) {
    console.log(err);
  }
});

/* List all products. */
router.get('/', function(req, res, next) {
  productListing = [];
  ybCassandra.execute('SELECT * FROM yb_ecommerce.products;')
             .then(result => {
                const row = result.first();
                for (var i = 0; i < result.rows.length; i++) {
                  productListing.push(result.rows[i]); 
                }
                return res.json(productListing);
             });
});

/* List products in a specific category. */
router.get('/category/:category', function(req, res, next) {
  productListing = [];
  var selectStmt = 'SELECT * FROM yb_ecommerce.products WHERE category=?;';
  ybCassandra.execute(selectStmt, [req.params.category])
              .then(result => {
                const row = result.first();
                for (var i = 0; i < result.rows.length; i++) {
                  productListing.push(result.rows[i]); 
                }
                return res.json(productListing);
              });
});

/* Return details of a specific product id. */
router.get('/details/:id', function(req, res, next) {
  var productDetails = {}
  var redisKey = 'product:' + req.params.id;
  var selectStmt = 'SELECT * FROM yb_ecommerce.products WHERE id=' + req.params.id + ';';
  ybCassandra.execute(selectStmt)
              .then(result => {
                const row = result.first();
                productDetails = Object.assign({}, row);
                return productDetails;
              })
              .then(productDetails => ybRedis.hgetall('product:' + req.params.id, function(err, result) {
                productDetails.stars = result.stars;
                productDetails.num_reviews = result.num_reviews;
                res.json(productDetails);
                return productDetails;
              }));
});


module.exports = router;
