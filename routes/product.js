/**
* Detailed information about any product.
*/
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
  //
  // TODO: Add ids 4, 5, 6
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


router.get('/', function(req, res, next) {
  console.log("Default: ");
});

router.get('/:id', function(req, res, next) {
  res_product = {};
  console.log("Product details: " + req.params.id);
  for (var product in products) {
    if (product.id == req.params.id) {
      res_product = product;
      break;
    }
  };
  res_product.productDetails = product_details_map[product.id]
  res.json(res_product);
});

module.exports = router;

