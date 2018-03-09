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

const yugabyte = require('cassandra-driver');
const ybClient = new yugabyte.Client({ contactPoints: ['127.0.0.1'],
                                       keyspace: 'yb_ecommerce'
                                     });
ybClient.connect(function (err) {
  if(err) {
    console.log(err);
  }
});

/* List all products. */
router.get('/', function(req, res, next) {
  productListing = [];
  ybClient.execute('SELECT * FROM yb_ecommerce.products;')
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
  ybClient.execute('SELECT * FROM yb_ecommerce.products WHERE category=?;', [req.params.category])
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
  res_products = [];
  products.map((product) => {
    if (product.id == req.params.id) {
      res_products.push(product);
    }
  });
  product = {}
  if (res_products.length > 0) {
    product = res_products[0];

    // TODO: Add detailed description.

    // Add review info for the product.
    product.reviews = product_review_details_map[product.id];

    // TODO: Add related products if any.
    // related_product_ids = related_product_ids_map[product.id].related_products;
    // console.log(related_product_ids);
    // if (related_product_ids.length > 0) {
    //   var related_products = [];
    //   products.map((cur_product) => {
    //     console.log("related: " + related_product_ids + ", cur = " + cur_product.id);
    //     if (related_product_ids.indexOf(cur_product.id) != -1) {
    //       related_products.push(cur_product);
    //       console.log("Added: " + cur_product.id);
    //     }
    //   });
    //   product.relatedProducts = related_products;
    // }
  }
  res.json(product);
});


module.exports = router;
