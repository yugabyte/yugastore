var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/usr/local/yugastore/ui/build/index.html');
});

module.exports = router;
