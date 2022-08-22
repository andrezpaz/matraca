var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('d')
  //next()
})
router.post('/', function (req, res){
  let id = req.body.idReq;
  let origin = req.headers.referer;
  let dest = origin.includes('requester') ? origin:'/receiver'

  axios
  .put(`http://localhost:3000/api/v1/posts/${id}`, {
    checked: true
  })
  .then(posts =>{
    res.redirect(dest);
  })
  .catch( error => {
    console.error(error)
    res.redirect(dest);
  })
});

module.exports = router;
