var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, nex) {
  res.send('d')
})
router.post('/', function (req, res){
  let destination = req.body.destination;
  let msg = req.body.msg;
  axios
  .post('http://localhost:3000/api/v1/posts/email', {
    destination:destination,
    msg: msg
  })
  .then(posts =>{
    res.redirect(`/requesterPublic`);
  })
  .catch( error => {
    console.error(error)
  })
});

module.exports = router;
