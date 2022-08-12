var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, nex) {
  res.send('d')
})
router.post('/', function (req, res){
  let requester = req.body.requester;
  let msg = req.body.msg;
  axios
  .post('http://localhost:3000/api/v1/postEmail', {
    requester:requester,
    msg: msg,
    checked: false
  })
  .then(posts =>{
    res.redirect(`http://localhost:3000/requester/${requester}`);
  })
  .catch( error => {
    console.error(error)
  })
});

module.exports = router;
