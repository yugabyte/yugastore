var express = require('express');
var router = express.Router();

const product_review_details_map = {
  "1": {stars: 4.5, num_reviews: 8},
  "2": {stars: 4.5, num_reviews: 8},
  "3": {stars: 4.5, num_reviews: 8},
  "4": {stars: 4.5, num_reviews: 8},
  "5": {stars: 4.5, num_reviews: 8},
  "6": {stars: 4.5, num_reviews: 8},
  "7": {stars: 4.5, num_reviews: 8},
  "8": {stars: 4.5, num_reviews: 8},
  "9": {stars: 4.5, num_reviews: 8},
  "10": {stars: 4.5, num_reviews: 8},
  "11": {stars: 4.5, num_reviews: 8},
  "12": {stars: 4.5, num_reviews: 8},
  "13": {stars: 4.5, num_reviews: 8},
  "14": {stars: 4.5, num_reviews: 8},
  "15": {stars: 4.5, num_reviews: 8},
  "16": {stars: 4.5, num_reviews: 8},
  "17": {stars: 4.5, num_reviews: 8},
  "18": {stars: 4.5, num_reviews: 8},
  "19": {stars: 4.5, num_reviews: 8},
  "20": {stars: 4.5, num_reviews: 8},
};

const related_product_ids_map = {
  "1": { related_products: [2] },
  "2": { related_products: [1] },
  "3": { related_products: [] },
  "4": { related_products: [] },
  "5": { related_products: [] },
  "6": { related_products: [7] },
  "7": { related_products: [6] },
  "8": { related_products: [] },
  "9": { related_products: [] },
  "10": { related_products: [11, 12] },
  "11": { related_products: [10, 12] },
  "12": { related_products: [10, 11] },
  "13": { related_products: [] },
  "14": { related_products: [] },
  "15": { related_products: [] },
  "16": { related_products: [17, 18] },
  "17": { related_products: [16, 18] },
  "18": { related_products: [16, 17] },
  "19": { related_products: [] },
  "20": { related_products: [] },
};

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
