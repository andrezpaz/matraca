const axios = require('axios');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:url',function(req, res, next) {

  requester = req.params.url
  axios
  .get(`http://localhost:3000/api/v1/posts/listRequester/${req.params.url}`)
  .then(posts => {
    let listReq = posts.data;
    
    res.render('requester', { data: {requester, listReq}});
  })
  .catch( (error)=>{
    console.error(error);
  })
});

module.exports = router;
