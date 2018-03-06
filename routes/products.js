var express = require('express');
var router = express.Router();

const products = [
  {
    id: 1,
    name: "The Power of HABIT",
    description: "The Power of HABIT: Why We Do What We Do in Life and Business.",
    price: 16.33,
    author: "Charles Duhigg",
    type: "hardcover",
    img: "https://images-na.ssl-images-amazon.com/images/I/51ejXdSceNL._AA300_.jpg",
    inCart: false,
    category: "business"
  },
  {
    id: 2,
    name: "Think and Grow Rich",
    description: "Results of researching the philosophy and lifestyle of billionaires.",
    price: 8.98,
    author: "Napoleon Hill",
    type: "hardcover",
    img: "https://images-na.ssl-images-amazon.com/images/I/51ZouHoBGtL._SX315_BO1,204,203,200_.jpg",
    inCart: false,
    category: "business"
  },
  {
    id: 3,
    name: "The 7 Habits of Highly Effective People",
    description: "The 7 Habits of Highly Effective PeoplePowerful Lessons in Personal Change.",
    price: 11.48,
    author: "Stephen R. Covey",
    type: "paperback",
    img: "https://images-na.ssl-images-amazon.com/images/I/51Myx6jMujL._AA300_.jpg",
    inCart: false,
    category: "business"
  },
  {
    id: 4,
    name: "Principles: Life and Work",
    description: "In Principles, Dalio shares what he's learned over the course of his remarkable career. He argues that life, management, economics, and investing can all be systemized into rules and understood like machines.",
    price: 18.00,
    author: "Ray Dalio",
    type: "hardcover",
    img: "https://images-na.ssl-images-amazon.com/images/I/51UyMOpP%2BGL._AA300_.jpg",
    inCart: false,
    category: "business"
  },
  {
    id: 5,
    name: "How to Win Friends & Influence People",
    description: "For more than sixty years the rock-solid, time-tested advice in this book has carried thousands of now famous people up the ladder of success in their business and personal lives.",
    price: 9.60,
    author: "Dale Carnegie",
    type: "paperback",
    img: "https://images-na.ssl-images-amazon.com/images/I/51PWIy1rHUL._AA300_.jpg",
    inCart: false,
    category: "business"
  },
  //
  // TODO: Add ids 3, 4, 5
  //
  {
    id: 6,
    name: "The Whole 30",
    description: "The 30-Day Guide to Total Health and Food Freedom",
    price: 18.00,
    author: "Melissa Hartwig",
    type: "hardcover",
    img: "https://images-na.ssl-images-amazon.com/images/I/61WFjEDBktL._SX437_BO1,204,203,200_.jpg",
    inCart: false,
    category: "cookbooks"
  },
  {
    id: 7,
    name: "The Food Lab",
    description: "Better Home Cooking Through Science",
    price: 33.94,
    author: "J. Kenji López-Alt",
    type: "harcover",
    img: "https://images-na.ssl-images-amazon.com/images/I/419aGgQt-5L._SX392_BO1,204,203,200_.jpg",
    inCart: false,
    category: "cookbooks"
  },
  //
  // TODO: Add ids 8, 9, 10
  //
  {
    id: 10,
    name: "True Fiction (Ian Ludlow Thrillers)",
    description: "A breakneck thriller where truth and fiction collide for the unluckiest writer alive.",
    price: 4.99,
    author: "Lee Goldberg",
    type: "kindle",
    img: "https://images-na.ssl-images-amazon.com/images/I/51UbplnqSgL._SX331_BO1,204,203,200_.jpg",
    inCart: false,
    category: "mystery"
  },
  {
    id: 11,
    name: "The Last Move",
    description: "An FBI agent must catch a copycat killer. The only difference this time: she's the final victim.",
    price: 7.91,
    author: "Mary Burton",
    type: "paperback",
    img: "https://images-na.ssl-images-amazon.com/images/I/514jRDA21TL._AA300_.jpg",
    inCart: false,
    category: "mystery"
  },
  {
    id: 12,
    name: "Stillhouse Lake (Stillhouse Lake Series)",
    description: "Gina Royal is the definition of average—a shy Midwestern housewife with a happy marriage and two adorable children. But when a car accident reveals her husband’s secret life as a serial killer, she must remake herself as Gwen Proctor—the ultimate warrior mom.",
    price: 8.96,
    author: "Rachel Caine",
    type: "paperback",
    img: "https://images-na.ssl-images-amazon.com/images/I/41RTt7alEqL._SX332_BO1,204,203,200_.jpg",
    inCart: false,
    category: "mystery"
  },
  //
  // TODO: Add ids 13, 14, 15
  //
  {
    id: 16,
    name: "Harry Potter and the Sorcerer's Stone",
    description: "On Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!",
    price: 24.64,
    author: "J.K.Rowling",
    type: "hardcover",
    img: "https://images-na.ssl-images-amazon.com/images/I/51qlgJ6ZojL.jpg",
    inCart: false,
    category: "scifi"
  },
  {
    id: 17,
    name: "A Game of Thrones: A Song of Ice and Fire, Book 1",
    description: "As a whole, this series comprises a genuine masterpiece of modern fantasy, bringing together the best the genre has to offer. Magic, mystery, intrigue, romance, and adventure fill these pages and transport us to a world unlike any we have ever experienced.",
    price: 25.16,
    author: "George R. R. Martin",
    type: "hardcover",
    img: "https://images-na.ssl-images-amazon.com/images/I/51n5SAiAz7L._AA300_.jpg",
    inCart: false,
    category: "accessories"
  },
  {
    id: 18,
    name: "The Lord of the Rings: One Volume",
    description: "In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others.",
    price: 27.66,
    autho: "J.R.R. Tolkien",
    type: "hardcover",
    img: "https://images-na.ssl-images-amazon.com/images/I/51d4G0sFMzL.jpg",
    inCart: false,
    category: "scifi"
  },
];

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


/* List all products. */
router.get('/', function(req, res, next) {
  res.json(products);
});

/* List products in a specific category. */
router.get('/category/:category', function(req, res, next) {
  res_products = [];
  products.map((product) => {
    if (product.category == req.params.category) {
      res_products.push(product);
    }
  });
  res.json(res_products);
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
