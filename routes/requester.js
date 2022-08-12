var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:url',function(req, res, next) {

  data = {'requester':req.params.url}
  res.render('requester', { data: data });
});

module.exports = router;
