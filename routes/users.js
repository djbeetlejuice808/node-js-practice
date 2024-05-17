var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/choida', function(req, res, next) {
  res.send(' Đá và đời ');
});

module.exports = router;
