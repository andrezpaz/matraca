var express = require('express');
const { post } = require('.');
var router = express.Router();
const axios = require('axios');
var functionsEjs = require('../public/javascripts/client.js');

/* GET home page. */
router.get('/', async function(req, res, next) {
  axios
  .get('http://localhost:3000/api/v1/posts')
  .then(posts =>{
    res.render('receiver', {data: posts.data, functions:functionsEjs});
  })
  .catch( error => {
    console.error(error)
  })  
})
  

module.exports = router;
