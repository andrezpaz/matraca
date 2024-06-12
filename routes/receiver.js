var express = require('express');
var router = express.Router();
const axios = require('axios');
var functionsEjs = require('../public/javascripts/client.js');

/* GET home page. */
router.get('/', async function(req, res, next) {
  axios
  .get('http://localhost:3000/api/v1/posts')
  .then(posts =>{
    console.log(posts)
    res.render('pages/receiver', {data: posts.data, functions:functionsEjs});
  })
  .catch( error => {
    console.error(error)
  })  
})
  

module.exports = router;
