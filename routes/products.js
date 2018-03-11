var express = require('express');
var router = express.Router();

var _=require('underscore');

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
                  var avgStars = result.rows[i].total_stars / result.rows[i].num_reviews;
                  result.rows[i].stars = avgStars.toFixed(2);
                  productListing.push(result.rows[i]); 
                }
                return res.json(productListing);
             });
});

/* List products by a sort category. */
router.get('/sort/:sortorder', function(req, res, next) {
  var key = 'allproducts:' + req.params.sortorder;
  console.log(key);
  ybRedis.zrevrange(key, 0, 10, 'withscores', function(err, members) {
      // the resulting members would be something like
      // ['id1', '<score-1>', 'id2', '<score-2>', 'id3', 'score-3']
      // use the following trick to convert to
      // [ [ 'id1', '<score-1>' ], [ 'id2', '<score-2>' ], [ 'id3', '<score-3>' ] ]
      // learned the trick from
      // http://stackoverflow.com/questions/8566667/split-javascript-array-in-chunks-using-underscore-js
      var lists=_.groupBy(members, function(a,b) {
          return Math.floor(b/2);
      });

      // Collect all the product ids.
      product_ids = [];
      for (var i = 0; entry = lists[i]; i++) {
        product_ids.push(entry[0]);
      }

      // Fetch details for all the product ids.
      productListing = [];
      var selectStmt = 'SELECT * FROM yb_ecommerce.products WHERE id IN ?;';
      ybCassandra.execute(selectStmt, [product_ids], { prepare: true })
                  .then(result => {
                    var productsMap = {};
                    for (var i = 0; i < result.rows.length; i++) {
                      var avgStars = result.rows[i].total_stars / result.rows[i].num_reviews;
                      result.rows[i].stars = avgStars.toFixed(2);
                      productsMap[result.rows[i].id] = result.rows[i];
                       
                    }
                    // Sort the product ids in descending order.
                    for (var i = 0; i < product_ids.length; i++) {
                      productListing.push(productsMap[product_ids[i]]);
                    }
                    return res.json(productListing);
                  });
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
                  var avgStars = result.rows[i].total_stars / result.rows[i].num_reviews;
                  result.rows[i].stars = avgStars.toFixed(2);
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
                var row = result.first();
                var avgStars = row.total_stars / row.num_reviews;
                row.stars = avgStars.toFixed(2);                
                productDetails = Object.assign({}, row);
                return res.json(productDetails);
              });
});


module.exports = router;
