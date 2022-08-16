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
  console.log(req.body);
  axios
  .put(`http://localhost:3000/api/v1/posts/${id}`, {
    checked: true
  })
  .then(posts =>{
    res.redirect(`/receiver`);
  })
  .catch( error => {
    console.error(error)
    res.redirect(`/receiver`);
  })
});

module.exports = router;
